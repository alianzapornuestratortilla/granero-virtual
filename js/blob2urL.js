async function dataURL2Blob(dataUrl) {
    try {
        return await url2Blob(dataUrl);
    } catch (error) {
        console.error(error);
    }
}

async function blob2dataURL(blob) {
    try {
        const reader = new FileReader();
        reader.onload = (evt) => {
            console.log(evt.target.result);
            return evt.target.result;
        };
        reader.onerror = (error) => {
            throw error;
        }
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error(error);
    }
}