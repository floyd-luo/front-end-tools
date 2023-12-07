interface FileType {
    /**
     * 将base64转换为File
     * @param {string} dataURI
     * @param {string} filename
     */
    dataURLtoFile(dataURI: string, filename?: string): File;

    /**
     * 将base64转换为Blob
     * @param {string} dataURI
     */
    dataURItoBlob(dataURI: string): Blob;

    /**
     * 返回文件大小字符串
     * @param {File} file
     */
    converFileSize(file: File): string;

    /**
     *
     */
    blobToDataURL(blob: Blob): any;
}

declare const File: FileType;

export default File;
