import { ImageJob, WorkerResponse, WorkerTask } from "./types"

export class WorkerManager {

    private workers: Worker[] = []
    private busyWorkers = new Set<Worker>()
    private workerTasks = new Map<Worker, WorkerTask>()
    private waitingTasks: WorkerTask[] = []

    constructor(
        workerCount = 3,
        private onJobStart?: (job: ImageJob) => void
    ) {

        for (let i = 0; i < workerCount; i++) {

            const worker = new Worker(
                new URL("./image-worker.ts", import.meta.url)
            )

            worker.onmessage = (
                event: MessageEvent<WorkerResponse>
            ) => {
                this.handleResponse(worker, event.data)
            }

            this.workers.push(worker)
        }
    }

    process(job: ImageJob): Promise<Blob> {

        return new Promise((resolve, reject) => {

            this.waitingTasks.push({
                job,
                resolve,
                reject
            })

            this.assignTasks()
        })
    }

    private assignTasks() {

        while (
            this.waitingTasks.length > 0
        ) {

            const worker = this.workers.find(
                worker => !this.busyWorkers.has(worker)
            )

            if (!worker) {
                return
            }

            const task = this.waitingTasks.shift()!

            this.onJobStart?.(task.job)

            this.busyWorkers.add(worker)

            this.workerTasks.set(
                worker,
                task
            )

            worker.postMessage({
                id: task.job.id,
                file: task.job.file,
                outputFormat: task.job.outputFormat
            })
        }
    }

    private handleResponse(
        worker: Worker,
        response: WorkerResponse
    ) {

        const task = this.workerTasks.get(worker)

        if (!task) {
            return
        }

        this.workerTasks.delete(worker)

        this.busyWorkers.delete(worker)

        if (response.success && response.output) {

            task.resolve(response.output)

        } else {

            task.reject(
                new Error(
                    response.error ?? "Image conversion failed"
                )
            )
        }

        this.assignTasks()
    }
}