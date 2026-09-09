import { ImageJob } from "./types"

export async function convertImage(job: ImageJob): Promise<Blob> {
    const bitmap = await createImageBitmap(job.file)

    const canvas = document.createElement("canvas")

    canvas.width = bitmap.width
    canvas.height = bitmap.height

    const context = canvas.getContext("2d")

    if (!context) {
        bitmap.close()
        throw new Error("Could not create canvas context")
    }

    context.drawImage(bitmap, 0, 0)

    bitmap.close()

    const mimeTypes = {
        jpg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        avif: "image/avif"
    }

    const mimeType = mimeTypes[job.outputFormat]

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(new Error("Failed to convert image"))
                }
            },
            mimeType,
            0.9
        )
    })

    return blob
}