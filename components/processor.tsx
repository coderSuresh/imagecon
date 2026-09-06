"use client"

import { formatFileSize, getFileType } from "@/app/utils/helpers"
import { useState } from "react"

interface ProcessorProps {
    files: File[] | null
    setDroppedFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

const Processor = ({ files, setDroppedFiles }: ProcessorProps) => {

    const [convertTo, setConvertTo] = useState("jpg")

    const removeFile = (index: number) => {
        if (files) {
            setDroppedFiles(prevFiles => prevFiles!.filter((_, i) => i !== index))
        }
    }

    const handleConvert = () => {

        if (files) {
            console.log(`Converting ${files.length} files to ${convertTo}`)
            
        }
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
                            <button onClick={handleConvert} className="sm:ml-4 px-4 py-2 w-full bg-primary text-white rounded hover:bg-primary/80">
                                Convert
                            </button>
                        </div>
                    </div>

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
                </div >
            )}

        </div >
    )
}

export default Processor
