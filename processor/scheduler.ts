import { convertImage } from "./convert-image"
import { ImageQueue } from "./queue"
import { ImageJob } from "./types"

export class Scheduler {

    private jobs: ImageJob[] = []

    constructor(
        private queue: ImageQueue,
    ) { }

    get allJobs() {
        return this.jobs
    }

    async start() {
        await this.processNext()
    }

    clear() {
        this.jobs = []
    }

    private async processNext() {
        const job = this.queue.next()

        if (!job) {
            return
        }

        try {

            const output = await convertImage(job)

            job.output = output
            job.status = "completed"

            this.jobs.push(job)
        } catch (error) {
            job.status = "failed"

            const errorMessage = error instanceof Error ? error.message : String(error)
            job.error = errorMessage

            this.jobs.push(job)
        }

        await this.processNext()
    }
}