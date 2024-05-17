const lePhotoBar = document.getElementById('photo-bar');

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            //--console.log('A child node has been added or removed.');
            //update formal files form
            if (!refreshFormPhotos(document.getElementById('input-img-def'), lePhotoBar)) {
                window.alert('algo salió mal al tratar de actualizar las fotos');
            }
        }
    }
});

observer.observe(lePhotoBar, { childList: true });

//-------------------

async function treatImages(evt) {
    var fotografías = await handleFileInput(evt);
    //--console.log(fotografías);
    //--console.log(fotografías.length);
    if (!(fotografías.length >= 1)) {
        return 0;
    }
    //now let's a pop up tha modal
    document.getElementById('photo-cropping-modal').showModal();

    try {

        currentFoto = fotografías[0];
        if (await resizeCanvas(currentFoto)) {
            //--console.log('first render done');
            //wait for acceptance
            let leInteraction = await interacción();
            //--console.log(leInteraction);
            switch (leInteraction) {
                case 'así-mero':
                    document.getElementById('photo-cropping-modal').close();
                    lePhotoBar.appendChild(await cropAndResize(currentFoto, leCanvasWidth, leCanvasHeight, aspectRatioFoto, scaleFactor));
                    let leInput = evt.target;
                    //modificar el query selector
                    leInput.closest('form').querySelector("label[for='input-fotos']").innerHTML = 'Seleccione fotografías adicionales.'
                    leInput.value = null;
                    return 1;

                default:
                    return 0;
            }

        } else {
            document.getElementById('photo-cropping-modal').close();
            return 0;
        }


    } catch (error) {
        console.log(error)
    }
}
//--------------------------------------

async function resizeCanvas(foto) {
    //--console.log('resizing Canvas');
    if (document.querySelector('canvas.photo-cropping-canvas') !== null) {
        document.querySelector('canvas.photo-cropping-canvas').remove();

    }
    if (document.querySelector('#photo-cropping-rectangle') !== null) {
        document.querySelector('#photo-cropping-rectangle').remove();

    }

    let fotoImg = await drawImage(foto);

    //check if min size
    if (Math.min(fotoImg.naturalHeight / leMinHeightFoto, fotoImg.naturalWidth / leMinWidthFoto) < 1) {
        document.getElementById('input-fotos').value = null;
        window.alert('¡fotografía demasiado pequeña!\nTomar con mayor resolución\ny/o de forma horizontal.');
        return false;
    }

    let canvas = document.createElement("canvas");
    canvas.setAttribute("class", "photo-cropping-canvas");
    canvas.style.width = '100%';
    canvas.style.height = '80%';
    document.getElementById('canvas-container').appendChild(canvas);
    canvas = document.querySelector('canvas.photo-cropping-canvas');

    leCanvasWidth = parseFloat(window.getComputedStyle(canvas).getPropertyValue("width")
        .replace(/[^0-9.]/g, ""));
    leCanvasHeight = parseFloat(window.getComputedStyle(canvas).getPropertyValue("height").replace(
        /[^0-9.]/g, ""));

    scaleFactor = Math.min(leCanvasWidth / fotoImg.naturalWidth, leCanvasHeight / fotoImg
        .naturalHeight);
    if (scaleFactor > 1) {
        scaleFactor = 1;
    }

    scaledImgWidth = scaleFactor * fotoImg.naturalWidth;
    scaledImgHeight = scaleFactor * fotoImg.naturalHeight;
    canvas.height = leCanvasHeight;
    canvas.width = leCanvasWidth;
    canvas.getContext('2d', { preserveDrawingBuffer: true }).drawImage(fotoImg, 0, 0, fotoImg.naturalWidth, fotoImg.naturalHeight, 0, 0,
        scaledImgWidth, scaledImgHeight);
    let leRectangle = document.createElement('div');
    leRectangle.setAttribute("id", "photo-cropping-rectangle");
    leRectangle.style.width = leMinWidthFoto * scaleFactor + 'px';
    leRectangle.style.height = leMinHeightFoto * scaleFactor + 'px';
    let rectangleContainer = document.getElementById('rectangle-container');
    rectangleContainer.style.width = scaledImgWidth + 'px';
    rectangleContainer.style.height = scaledImgHeight + 'px';
    rectangleContainer.appendChild(leRectangle);

    interact('#photo-cropping-rectangle')
        .draggable({
            listeners: {
                move: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // restrict the movement of the rectangle within the rectangleContainer
                    x = Math.min(Math.max(x, 0), scaledImgWidth - target.offsetWidth);
                    y = Math.min(Math.max(y, 0), scaledImgHeight - target.offsetHeight);

                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            }
        })
        .resizable({
            modifiers: [
                interact.modifiers.aspectRatio({
                    // make sure the aspect ratio is constant
                    ratio: aspectRatioFoto,
                    // also restrict the size by nesting another modifier
                    modifiers: [
                        interact.modifiers.restrictSize({
                            min: {
                                width: leMinWidthFoto * scaleFactor,
                                height: leMinHeightFoto * scaleFactor
                            },
                            max: {
                                width: scaledImgWidth,
                                height: scaledImgHeight
                            }
                        }),
                        interact.modifiers.restrictEdges({
                            outer: 'parent',
                            endOnly: true
                        })
                    ],
                }),
            ],
            edges: {
                left: false,
                right: true,
                bottom: true,
                top: false
            },
            inertia: true
        })
        .on('resizemove', function (event) {
            var target = event.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0);
            var y = (parseFloat(target.getAttribute('data-y')) || 0);

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        });
    return true;
}

//-------------

async function cropAndResize(currentFoto, leCanvasWidth, leCanvasHeight, aspectRatioFoto, scaleFactor) {

    let leRectangle = document.getElementById('photo-cropping-rectangle');
    //--console.log(leRectangle.getAttribute("data-x"));
    //--console.log(parseFloat(leRectangle.getAttribute("data-x")));

    let scaledOriginX = parseFloat(leRectangle.getAttribute("data-x"));
    //--console.log(scaledOriginX);
    if (isNaN(scaledOriginX)) {
        scaledOriginX = 0;
    }
    let scaledOriginY = parseFloat(leRectangle.getAttribute("data-y"));
    if (isNaN(scaledOriginY)) {
        scaledOriginY = 0;
    }
    let scaledHeight = parseFloat(leRectangle.style.height);
    let scaledWidth = parseFloat(leRectangle.style.width);

    //get unscaled positions and dimensions. Just divide by the scaling factor
    //scaledOriginX/scaleFactor
    //scaledOriginY/scaleFactor
    //scaledHeight/scaleFactor
    //scaledWidth/scaleFactor
    // rescalated dimensions
    // reScaledHeight = leMinHeightFoto;
    // reScalatedWidth = leMinWidthFoto;

    //create canvas with rescalated dimensions, draw croped and rescalated image

    //const originalImage = await createImageBitmap(await url2Blob(currentFoto));
    const originalImage = await drawImage(currentFoto);
    let canvasAdHoc = document.createElement('canvas');
    canvasAdHoc.width = leMinWidthFoto;
    canvasAdHoc.height = leMinHeightFoto;
    ///--> -->
    // --> --> --> commented but is useful
    //console.log(originalImage, (scaledOriginX / scaleFactor), (scaledOriginY / scaleFactor), (scaledWidth / scaleFactor), (scaledHeight / scaleFactor), 0, 0, leMinWidthFoto, leMinHeightFoto);
    canvasAdHoc.getContext('2d', { preserveDrawingBuffer: true }).drawImage(originalImage, (scaledOriginX / scaleFactor), (scaledOriginY / scaleFactor), (scaledWidth / scaleFactor), (scaledHeight / scaleFactor), 0, 0, leMinWidthFoto, leMinHeightFoto);
    //return await drawImage(canvasAdHoc.toDataURL());
    return canvasAdHoc;
}

/*------------------- */

function setPhotos(event) {
    //set button unclickable
    event.target.disabled = true;
    let leInput = document.getElementById('input-fotos');
    // set non editable
    leInput.disabled = true;
    // clear
    leInput.value = null;
    //add files
    leInput.setAttribute('multiple', true);
    // Al parecer no se puede añadir archivos a un input de forma programática, habría que alterar el formData ya que se vaya a enviar la form:
    //const formData = new FormData();
    //formData.append('file', file);
    //habría que haerlo para cada file en el array fileListAdHoc
}

function addPhoto(event) {
    let leInput = document.getElementById('input-fotos');
    leInput.click();
}

//------------------------------------
function cancelBarImages(event) {
    void resetPhotoArrays();
    let leInput = document.getElementById('input-fotos');
    leInput.disabled = false;
    document.getElementById('ya-estuvo').disabled = false;
    leInput.value = null;

    while (lePhotoBar.firstChild) {
        lePhotoBar.removeChild(lePhotoBar.firstChild);
    }
}
