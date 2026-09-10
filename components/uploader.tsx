"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Processor from './processor';

const Uploader = () => {

    const [isDragActive, setIsDragActive] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<File[] | null>(null);

    const appendToDroppedFiles = (files: File[]) => {
        setDroppedFiles(prevFiles => {
            if (prevFiles) {
                return [...files, ...prevFiles];
            } else {
                return files;
            }
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragActive(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragActive(false);

        const files = e.dataTransfer.files;
        appendToDroppedFiles(Array.from(files));
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragActive(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragActive(false);
    }

    useEffect(() => {
        window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
            e.preventDefault();
        });
    }, []);

    return (
        <section className="bg-white border border-primary/70 rounded-lg p-6 mt-10 max-w-6xl mx-auto">
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`text-center py-10 border border-gray-400 border-dashed hover:bg-gray-100 ${isDragActive ? 'bg-gray-100' : ''} rounded-lg`}
            >

                <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto grid place-items-center">
                        <Image
                            src="/image.svg"
                            alt="Upload Icon"
                            width={42}
                            height={42}
                        />
                    </div>

                    <p className="mt-4">
                        Drag & drop images here, or <span className="text-primary font-medium"><u>browse</u></span>
                    </p>
                    <p className="text-foreground/70 text-sm mt-2">
                        Supports WebP, PNG, JPEG, AVIF, HEIC
                    </p>
                </label>

                <input
                    id="file-upload"
                    type="file"
                    accept='image/*'
                    className="hidden" multiple
                    onChange={(e) => appendToDroppedFiles(e.target.files ? Array.from(e.target.files) : [])}
                />
            </div>

            <Processor files={droppedFiles} setDroppedFiles={setDroppedFiles} />

        </section>

    )
}

export default Uploader
