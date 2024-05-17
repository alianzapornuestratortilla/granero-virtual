function añadeOtro(listaID, templateID) {
    document.getElementById(listaID).appendChild(document.getElementById(templateID).content.cloneNode(true));
}
function killOtro(event) {
    const listaDeOtrosContainer = event.target.closest('fieldset.lista-de-otros-container');
    event.target.closest('fieldset.otro').remove();
    if (listaDeOtrosContainer.querySelector('div.lista-de-otros').querySelectorAll('fieldset.otro').length == 0) {
        listaDeOtrosContainer.querySelector('button.btn-añade').dispatchEvent(new Event('click'));
    }
}

function showHideOtros(event) {
    const elements = event.target.getAttribute('otros').split(' ');
    const container = event.target.closest('fieldset.lista-de-otros-container');
    const isChecked = event.target.checked;
    let display
    switch (isChecked) {
        case true:
            display = "block";
            break;
        case false:
            display = "none";
            break;

        default:
            break;
    }

    elements.forEach(element => {
        element = container.querySelector(element);
        element.style.display = display;
        // debugger
        if (element.tagName == "DIV" && element.classList.contains('lista-de-otros')) {

            // const required = isChecked;
            // debugger
            const fieldsetsDeOtro = element.childNodes;

            for (let index = 0; index < fieldsetsDeOtro.length; index++) {
                const fieldsetDeOtro = fieldsetsDeOtro[index];
                if (fieldsetDeOtro.tagName == "FIELDSET") {                    
                    // fieldsetDeOtro.querySelector('input.input-otros').required = required;
                }

            }
        }
    });
}