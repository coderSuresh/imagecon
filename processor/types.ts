export type OutputFormat =
    | "jpg"
    | "png"
    | "webp"
    | "avif"

export type JobStatus =
    | "queued"
    | "processing"
    | "completed"
    | "failed"

export interface ImageJob {
    id: string
    file: File
    outputFormat: OutputFormat

    status: JobStatus
    progress: number

    output?: Blob
    error?: string
}