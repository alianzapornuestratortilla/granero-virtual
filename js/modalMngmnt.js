function closeModal(event) {
    event.target.closest('dialog').close();
}

function openModal(event) {
    document.getElementById(event.currentTarget.getAttribute("dialogID")).showModal();
    
}

function getElementFromTemplate(templateID) {
    return document.importNode(document.getElementById(templateID).content, true);
}