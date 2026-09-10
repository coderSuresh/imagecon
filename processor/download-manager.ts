import JSZip from "jszip";
import { ImageJob } from "./types";

export class DownloadManager {

    public download(job: ImageJob) {

        if (!job.output)
            throw new Error("No output available for download.");

        const extension = job.outputFormat

        this.downloadBlob(
            job.output,
            this.getFileName(job.file.name, extension)
        )
    }

    public async downloadAll(jobs: ImageJob[]) {

        const completedJobs = jobs.filter(job => job.status === "completed" && job.output)

        if (completedJobs.length === 0)
            throw new Error("No completed jobs available for download.");

        if(completedJobs.length === 1) {
            this.download(completedJobs[0])
            return
        }

        const zip = new JSZip()
        const usedNames = new Set<string>()

        completedJobs.forEach(job => {
            if (job.output) {
                const extension = job.outputFormat
                zip.file(
                    this.getUniqueFileName(job.file.name, extension, usedNames),
                    job.output
                )
            }
        })

        const zipBlob = await zip.generateAsync({ type: "blob" })

        this.downloadBlob(zipBlob, "converted_images.zip")
    }

    private downloadBlob(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = filename;

        a.click();

        URL.revokeObjectURL(url);
    }

    private getFileName(
        originalName: string,
        extension: string
    ) {
        const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf("."))

        return `${nameWithoutExtension}.${extension}`
    }

    private getUniqueFileName(
        fileName: string,
        extension: string,
        usedNames: Set<string>
    ) {
        const baseName = fileName.substring(
            0,
            fileName.lastIndexOf(".")
        )

        let name = `${baseName}.${extension}`
        let counter = 1

        while (usedNames.has(name)) {
            name = `${baseName} (${counter}).${extension}`
            counter++
        }

        usedNames.add(name)

        return name
    }
}