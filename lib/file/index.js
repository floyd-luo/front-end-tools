export default {
    //将base64转换为File
    dataURLtoFile: function (dataurl, filename = '') {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    },
    dataURItoBlob: function (dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    },
    converFileSize(limit) {
        var size = '';
        if (limit < 0.1 * 1024) {
            //如果小于0.1KB转化成B
            size = limit.toFixed(2) + 'B';
        } else if (limit < 0.1 * 1024 * 1024) {
            //如果小于0.1MB转化成KB
            size = (limit / 1024).toFixed(2) + 'KB';
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //如果小于0.1GB转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }
        var sizestr = size + '';
        var len = sizestr.indexOf('.');
        var dec = sizestr.substr(len + 1, 2);
        if (dec === '00') {
            //当小数点后为00时 去掉小数部分
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
        }
        return sizestr;
    },
    blobToDataURL(blob) {
        const type = blob.type;
        return new Promise((resolve, reject) => {
            let videoCover = null;
            const src = URL.createObjectURL(blob);
            if (type.indexOf("video/") >= 0) {
                const canvas = document.createElement('canvas');
                const video = document.createElement('video');
                video.preload = 'auto';
                video.setAttribute('crossOrigin', 'anonymous');
                video.src = src;
                video.onloadeddata = () => {
                    video.play();
                    video.currentTime = 1;
                    video.addEventListener('play', () => {
                        setTimeout(() => {
                            canvas.width = 250;
                            canvas.height = 250 * video.videoHeight / video.videoWidth;
                            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                            videoCover = canvas.toDataURL();
                            video.pause();
                            resolve({url: src, videoCover});
                        }, 100);
                    });
                }
            } else {
                resolve(src);
            }
        });
    }
};
