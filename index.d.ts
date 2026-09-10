declare module "libheif-js/wasm-bundle" {

    interface HeifImage {
        get_width(): number
        get_height(): number

        display(
            imageData: ImageData,
            callback: (displayData: ImageData | null) => void
        ): void
    }

    class HeifDecoder {
        decode(data: Uint8Array): HeifImage[]
    }

    interface LibHeif {
        HeifDecoder: typeof HeifDecoder
    }

    const libheif: LibHeif
}