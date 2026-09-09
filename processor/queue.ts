import { ImageJob } from "./types"

export class ImageQueue {

    private queue: ImageJob[] = []

    add(job: ImageJob) {
        this.queue.push(job)
    }

    addMany(jobs: ImageJob[]) {
        this.queue.push(...jobs)
    }

    next(): ImageJob | undefined {
        return this.queue.shift()
    }

    get size() {
        return this.queue.length
    }

    clear() {
        this.queue = []
    }
}