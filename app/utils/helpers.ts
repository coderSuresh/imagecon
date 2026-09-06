const getFileType = (file: File) => {
    const type = file.type.split('/')[1]

    if (type) return type.toUpperCase()

    const extension = file.name.split('.').pop()

    return extension ? extension.toUpperCase() : 'Unknown'
}

const formatFileSize = (size: number) => {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export { getFileType, formatFileSize }