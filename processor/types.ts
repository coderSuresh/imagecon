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

export interface WorkerRequest {
    id: string
    file: File
    outputFormat: OutputFormat
}

export interface WorkerResponse {
    id: string
    success: boolean
    output?: Blob
    error?: string
}

export interface WorkerTask {
    job: ImageJob
    resolve: (output: Blob) => void
    reject: (error: Error) => void
}