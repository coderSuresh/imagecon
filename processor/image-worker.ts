import libheif from "libheif-js/wasm-bundle"
import { decode as decodeAvif, encode as encodeAvif } from "@jsquash/avif"

import {
    OutputFormat,
    WorkerRequest,
    WorkerResponse
} from "./types"

const mimeTypes: Record<OutputFormat, string> = {
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif"
}

async function decodeHeic(file: File): Promise<ImageData> {

    const buffer = await file.arrayBuffer()

    const decoder = new libheif.HeifDecoder()

    const images = decoder.decode(new Uint8Array(buffer))

    if (!images.length) {
        throw new Error("Could not decode HEIC image")
    }

    const image = images[0]

    const width = image.get_width()
    const height = image.get_height()

    const imageData = new ImageData(width, height)

    await new Promise<void>((resolve, reject) => {

        image.display(
            imageData,
            (displayData: ImageData | null) => {

                if (!displayData) {
                    reject(new Error("Could not decode HEIC image"))
                    return
                }

                resolve()
            }
        )
    })

    return imageData
}

async function decodeImage(
    file: File
): Promise<ImageData> {

    const isHeic =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        /\.(heic|heif)$/i.test(file.name)

    const isAvif =
        file.type === "image/avif" ||
        /\.avif$/i.test(file.name)

    if (isHeic) {
        return decodeHeic(file)
    }

    if (isAvif) {
        const imageData = await decodeAvif(await file.arrayBuffer())

        if (!imageData) {
            throw new Error("Could not decode AVIF image")
        }

        return imageData
    }

    const bitmap = await createImageBitmap(file)

    const canvas = new OffscreenCanvas(
        bitmap.width,
        bitmap.height
    )

    const context = canvas.getContext("2d")

    if (!context) {
        bitmap.close()
        throw new Error("Could not create canvas context")
    }

    context.drawImage(bitmap, 0, 0)

    bitmap.close()

    return context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    )
}

self.onmessage = async (
    event: MessageEvent<WorkerRequest>
) => {

    const { id, file, outputFormat } = event.data

    try {

        const imageData = await decodeImage(file)

        let blob: Blob

        if (outputFormat === "avif") {

            const avifBuffer = await encodeAvif(imageData, { speed: 8 })

            blob = new Blob(
                [avifBuffer],
                { type: "image/avif" }
            )
        } else {

            const canvas = new OffscreenCanvas(
                imageData.width,
                imageData.height
            )

            const context = canvas.getContext("2d")

            if (!context) {
                throw new Error("Could not create canvas context")
            }

            context.putImageData(imageData, 0, 0)

            blob = await canvas.convertToBlob({
                type: mimeTypes[outputFormat],
                quality: outputFormat === "png"
                    ? undefined
                    : 0.85,
            })
        }

        const response: WorkerResponse = {
            id,
            success: true,
            output: blob,
        }

        self.postMessage(response)

    } catch (error) {

        const response: WorkerResponse = {
            id,
            success: false,
            error: error instanceof Error
                ? error.message
                : String(error),
        }

        self.postMessage(response)
    }
}