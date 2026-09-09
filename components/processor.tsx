"use client"

import { DownloadManager } from "@/processor/download-manager"
import { ImageQueue } from "@/processor/queue"
import { Scheduler } from "@/processor/scheduler"
import { ImageJob, OutputFormat } from "@/processor/types"
import { formatFileSize, getFileType } from "@/utils/helpers"
import { useRef, useState } from "react"

interface ProcessorProps {
    files: File[] | null
    setDroppedFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

const Processor = ({ files, setDroppedFiles }: ProcessorProps) => {

    const [convertTo, setConvertTo] = useState("jpg")
    const [isProcessing, setIsProcessing] = useState(false)
    const [jobs, setJobs] = useState<ImageJob[]>([])

    const queue = useRef<ImageQueue | null>(null)
    const scheduler = useRef<Scheduler | null>(null)
    const downloadManager = useRef<DownloadManager | null>(null)

    if (queue.current === null) {
        queue.current = new ImageQueue()
    }

    if (scheduler.current === null) {
        scheduler.current = new Scheduler(
            queue.current
        )
    }

    if (downloadManager.current === null) {
        downloadManager.current = new DownloadManager()
    }

    const removeFile = (index: number) => {
        if (files) {
            setDroppedFiles(prevFiles => prevFiles!.filter((_, i) => i !== index))
        }
    }

    const completedJobs = jobs.filter(job => job.status === "completed" && job.output)
    const failedJobs = jobs.filter(job => job.status === "failed")
    const failedJobsUniqueErrors = Array.from(new Set(failedJobs.map(job => job.error)))

    const handleConvert = async () => {

        if (!files || files.length === 0) return

        queue.current?.clear()
        scheduler.current?.clear()

        const jobs: ImageJob[] = files.map((file) => ({
            id: crypto.randomUUID(),
            file,
            outputFormat: convertTo as OutputFormat,
            status: "queued",
            progress: 0
        }))

        queue.current?.addMany(jobs)

        try {
            setIsProcessing(true)
            await scheduler.current?.start()
            setJobs([...scheduler.current!.allJobs])
        }
        finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (completedJobs.length === 0) {
            return
        }

        downloadManager.current?.downloadAll(completedJobs)
    }

    return (
        <div>

            {files && files.length > 0 && (
                <div className="mt-6">

                    <div className="flex flex-wrap justify-between items-center">
                        <h3 className="text-lg font-semibold mb-2">Dropped Files: {files.length} </h3>

                        <div className="flex sm:flex-row sm:w-fit w-full flex-col items-center gap-2">
                            <p className="whitespace-nowrap">Convert to: </p>
                            <select
                                value={convertTo}
                                onChange={(e) => setConvertTo(e.target.value)}
                                name="convert-to"
                                className="px-4 py-2 w-full sm:w-fit border border-gray-300 rounded"
                            >
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="webp">WebP</option>
                                <option value="avif">AVIF</option>
                            </select>
                            <button
                                onClick={handleConvert}
                                disabled={isProcessing}
                                className="sm:ml-4 px-4 py-2 w-full bg-primary text-white rounded hover:bg-primary/80"
                            >
                                {isProcessing ? "Processing..." : "Convert"}
                            </button>

                            {completedJobs.length > 0 && (
                                <button
                                    onClick={handleDownload}
                                    className="px-4 py-2 bg-primary text-white rounded whitespace-nowrap hover:bg-primary/80"
                                >
                                    {completedJobs.length === 1
                                        ? "Download"
                                        : "Download All"}
                                </button>
                            )}

                        </div>
                    </div>

                    {
                        failedJobs.length > 0 && (
                            <p className="text-red-600">
                                {failedJobs.length} job{failedJobs.length > 1 ? "s" : ""} failed. &nbsp;
                                {
                                    failedJobsUniqueErrors.map((error, index) => (
                                        <span key={index}>
                                            {error}
                                        </span>
                                    ))
                                }
                            </p>
                        )
                    }

                    <table className="min-w-full border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-start border border-gray-300 px-4 py-2">File Name</th>
                                <th className="text-start sm:table-cell hidden border border-gray-300 px-4 py-2">Size</th>
                                <th className="text-start sm:table-cell hidden border border-gray-300 px-4 py-2">Format</th>
                                <th className="text-start border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(files).map((file, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{file.name}</td>
                                    <td className="sm:table-cell hidden border border-gray-300 px-4 py-2">{formatFileSize(file.size)}</td>
                                    <td className="sm:table-cell hidden border border-gray-300 px-4 py-2">{getFileType(file)}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            aria-label="Remove file"
                                            onClick={() => removeFile(index)}
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}

export default Processor
