import { WorkerResponse, ImageJob } from "./types"

const worker = new Worker(
    new URL("./image-worker.ts", import.meta.url)
)

export function convertImage(job: ImageJob): Promise<Blob> {
    return new Promise((resolve, reject) => {

        const handleMessage = (event: MessageEvent<WorkerResponse>) => {
            const response = event.data

            if (response.id !== job.id) {
                return
            }

            worker.removeEventListener("message", handleMessage)

            if (response.success && response.output) {
                resolve(response.output)
            } else {
                reject(
                    new Error(
                        response.error ?? "Image conversion failed"
                    )
                )
            }
        }

        worker.addEventListener("message", handleMessage)

        worker.postMessage({
            id: job.id,
            file: job.file,
            outputFormat: job.outputFormat,
        })
    })
}