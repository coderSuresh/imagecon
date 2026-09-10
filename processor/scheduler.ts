import { ImageQueue } from "./queue"
import { ImageJob } from "./types"
import { WorkerManager } from "./worker-manager"

export class Scheduler {

    private jobs: ImageJob[] = []

    constructor(
        private queue: ImageQueue,
        private workerManager = new WorkerManager(),
        private onJobUpdate?: (job: ImageJob) => void
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

    async retry(job: ImageJob) {

        job.status = "queued"
        job.progress = 0
        job.error = undefined
        job.output = undefined

        this.onJobUpdate?.(job)

        await this.process(job)
    }

    private async processNext() {
        const promises: Promise<void>[] = []
        let job: ImageJob | undefined

        while (job = this.queue.next()) {
            this.jobs.push(job)
            
            const promise = this.process(job)
            promises.push(promise)
        }

        await Promise.all(promises)
    }

    private async process(job: ImageJob) {

        try {

            const output = await this.workerManager.process(job)

            job.output = output
            job.status = "completed"
            job.progress = 100

            this.onJobUpdate?.(job)

        } catch (error) {

            job.status = "failed"

            job.error = error instanceof Error
                ? error.message
                : String(error)
            
            this.onJobUpdate?.(job)
        }
    }
}