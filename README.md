# Image Converter

A client-side image converter built with Next.js that converts images directly in your browser using Web Workers, WebAssembly, and browser APIs.

No images are uploaded to a server.

## Features

* Convert images directly in the browser
* Parallel image processing using Web Workers
* Client-side processing (images never leave your device)
* Convert multiple images at once
* Download a single converted image
* Download multiple converted images as a ZIP
* Retry failed conversions
* Support for multiple image formats
* WASM-powered HEIC and AVIF processing
* Responsive interface

## Supported Formats

### Input

* JPG / JPEG
* PNG
* WebP
* HEIC / HEIF
* AVIF

### Output

* JPG
* PNG
* WebP
* AVIF

> Browser and library support may vary depending on the input image and environment.

## How It Works

The application processes images entirely on the client.

```text
User
 ↓
Processor
 ↓
ImageQueue
 ↓
Scheduler
 ↓
WorkerManager
 ↓
Web Workers
 ↓
WASM / Browser APIs
 ↓
Converted Blob
 ↓
DownloadManager
 ↓
Download Single / ZIP
```

### Processing Architecture

The application uses multiple Web Workers to process images in parallel.

```text
                 WorkerManager
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    Worker 1      Worker 2      Worker 3
        ↓             ↓             ↓
      Image         Image         Image
        │             │             │
        └─────────────┼─────────────┘
                      ↓
                 Converted Blob
```

When all workers are busy, additional jobs wait in the WorkerManager's internal waiting queue. As soon as a worker finishes, the next waiting job is assigned to it.

This allows large batches of images to be processed concurrently without blocking the main browser thread.

## Project Structure

* processor
  * queue.ts
  * scheduler.ts
  * worker-manager.ts
  * image-worker.ts
  * download-manager.ts
  * types.ts

* components
  * processor.tsx
  * uploader.tsx

### Core Components

#### ImageQueue

Responsible for storing jobs waiting to be processed.

```text
Files
 ↓
ImageQueue
 ↓
Next Job
```

#### Scheduler

Coordinates the processing lifecycle and keeps track of all jobs.

It handles:

* Starting queued jobs
* Tracking jobs
* Updating job status
* Retrying failed jobs

#### WorkerManager

Manages the Web Workers.

It:

* Creates workers
* Assigns jobs to available workers
* Keeps track of busy workers
* Queues jobs when all workers are busy
* Resolves or rejects processing tasks
* Assigns the next job when a worker becomes available

#### Image Worker

Each Web Worker performs the actual image conversion.

Depending on the input format, it uses:

* `libheif-js` for HEIC/HEIF decoding
* `@jsquash/avif` for AVIF encoding/decoding
* `OffscreenCanvas` for browser-based image conversion

#### DownloadManager

Responsible for downloading converted images.

It supports:

* Individual downloads
* ZIP downloads
* Duplicate filename handling
* Excluding failed jobs from the ZIP

## Technologies

* [Next.js](https://nextjs.org/)
* TypeScript
* Tailwind CSS
* Web Workers
* OffscreenCanvas
* External Libraries
  * `libheif-js`
  * `@jsquash/avif`
  * JSZip

## Getting Started

### Prerequisites

* Node.js

### Installation

Clone the repository:

```bash
git clone https://github.com/codersuresh/imagecon
cd imagecon
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Privacy

Images are processed locally in the browser.

The application does not require users to upload their images to a backend server for conversion.

This makes the project useful for images that users may prefer not to send to a third-party server.

Useful for bulk conversion.

## Why Web Workers?

Image conversion can be CPU-intensive, especially when processing many high-resolution images.

Running conversion directly on the main thread can make the interface unresponsive.

Web Workers allow image processing to happen away from the main JavaScript thread.

Multiple workers can also process multiple images concurrently.

The number of workers can be adjusted from `components\processor.tsx`

## Error Handling

Individual conversion failures do not stop the entire batch.

For example:

```text
Image 1 → completed
Image 2 → completed
Image 3 → failed
Image 4 → completed
Image 5 → completed
```

The failed job can be retried independently.

When downloading all completed images as a ZIP, failed jobs are automatically excluded.

## Duplicate Files

The application handles duplicate filenames when creating ZIP archives.

For example:

```text
photo.jpg
photo.jpg
photo (1).jpg
```

This prevents files with the same name from overwriting each other inside the ZIP archive.

## Current Limitations

The project intentionally keeps the current feature set focused.

Current limitations include:

* No image storage
* No image preview
* No advanced image editing
* No per-image quality controls
* No per-image compression settings
* No conversion cancellation

These may be considered for future versions where they provide meaningful value.

## Contributing

Contributions are welcome.

Before working on a feature, please check the existing issues and project structure.

### Development Guidelines

* Keep processing client-side unless there is a strong reason to change the architecture.
* Avoid unnecessary dependencies.
* Keep responsibilities separated between the queue, scheduler, worker manager, workers, and download manager.
* Prefer TypeScript and maintain existing type safety.
* Test changes with multiple images, including large batches.
* Consider browser memory and CPU usage when modifying image processing.

### Pull Requests

When submitting a pull request:

1. Explain what was changed.
2. Explain why the change is needed.
3. Test the change locally.
4. Include relevant screenshots for UI changes.
5. Keep pull requests focused on one problem or feature.

## Roadmap

Possible future improvements include:

* Image quality controls
* AVIF quality settings
* Better conversion progress reporting
* Improved browser compatibility
* More robust worker error handling
* Automated tests
* Performance benchmarking
* Accessibility improvements
* Additional image formats

The roadmap is intentionally kept open so contributors can propose and discuss improvements.
