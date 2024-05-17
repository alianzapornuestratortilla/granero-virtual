var currentFoto = null;
var clicked = false;
const leMinWidthFoto = 800;
const leMinHeightFoto = 600;
//or 1080×720 pixels
const aspectRatioFoto = leMinWidthFoto / leMinHeightFoto;
var leCanvasWidth
var leCanvasHeight
var scaleFactor

// var fileListAdHoc = []; // not used
var webpURLArrAdHoc = [];

//-------------



//---------------

function resetPhotoArrays() {
    //fileListAdHoc = [];
    webpURLArrAdHoc = [];
}

//-----------------

function refreshFormPhotos(leInput, lePhotoBar) {
    void resetPhotoArrays();
    //--console.log(lePhotoBar.children);
    for (laFoto of lePhotoBar.children) {

        //--console.log(laFoto);
        if (laFoto.tagName === "CANVAS") {
            // element is an image
            // convert to webp file and add to array
            //****
            //let a = document.createElement("a");
            //a.href = canvas2webpURL(laFoto);
            //a.download = "imagen.webp";
            //a.click();
            //*****
            let webpURL = canvas2webpURL(laFoto);
            //-- console.log(webpURL);
            //-- console.log('separador');
            //comented out, not to be used
            webpURLArrAdHoc.push(webpURL);

            //fileListAdHoc.push(dataURLtoFile(url2Blob(webpURL), nameGenerator()));                        
            //console.log(fileListAdHoc);
        }
    }
    return true;
}

//---------------

function canvas2webpURL(canvas, fileName) {
    return canvas.toDataURL("image/webp");
}



//--------------------------

async function interacción() {
    try {
        //console.log('inicia click listening');
        let presionaAlgo = new Promise((resolve, reject) => {
            //document.querySelector('button#photo-cropping-modal-close').addEventListener('click', resolve('cancelar'));//should be redundant
            document.querySelector('button#botón-descartar-foto').addEventListener('click', () => {
                console.log('presionaron descartar foto');
                resolve('descartar-foto');
            });
            document.querySelector('button#botón-así-mero').addEventListener('click', () => {
                //console.log('presionaron así mero');
                resolve('así-mero');
            });
            document.querySelector('dialog#photo-cropping-modal').addEventListener('close', () => {
                console.log('presionaron cancelar');
                resolve('cancelar');
            });


        });

        return await presionaAlgo
            .then(result => {
                void deleteEventListener('button#botón-descartar-foto');
                void deleteEventListener('button#botón-así-mero');
                void deleteEventListener('dialog#photo-cropping-modal');
                return result;
            })
            .catch(error => {
                console.log('e1');
                console.error(error);
            });

    } catch (error) {
        console.log('e2');
        console.error(error.message);
        return false;
    }
}

//---------------------------------

function deleteEventListener(daQuerySelector) {
    //reemplazando por clon es lo más fácil, dice bing
    const el = document.querySelector(daQuerySelector);
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
}

//---------------------------------

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
    });
}
async function drawImage(url) {

    try {
        return await loadImage(url);
    } catch (err) {
        console.log(err);
    }
}

//----------------

async function logImageData(file, reader) {
    try {
        const fileResult = await reader(file);
        return fileResult.result;
        // handle fileResult
    } catch (err) {
        return err;
        // handle error
    }
}

//--------------------------------------------------

async function handleFileInput(evt) {
    var files = event.target.files;
    var lePhotos = [];
    for (var i = 0; i <= (files.length - 1); i++) {
        let file = files[i]; //le current file
        // Only process image files.
        if (!file.type.match('image.*')) {
            continue;
        }

        const reader = (file) => new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });

        lePhotos.push(await logImageData(file, reader))

    }
    return lePhotos;
}

//--------------------------------------------

window.onresize = () => {
    console.log('allegedly resizing');
    if (document.querySelector('dialog#photo-cropping-modal').open == true) {
        resizeCanvas(currentFoto);
    }
};



//----------------------

function closePhotoCroppingModal(event) {
    event.target.closest('dialog#photo-cropping-modal').close();
}


//-------------------------------------------



            async function url2Blob(imageUrl) {
                return await (await fetch(imageUrl)).blob();
            }

            function dataURLtoFile(webpBlob, filename) {
                return new File([webpBlob], filename + ".webp", { type: "image/webp" });
            }





//-------------------------------