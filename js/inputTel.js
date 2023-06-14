
function onlyNumbers(event) {
    let leInput = event.target;
    leInput.value = leInput.value.replace(/[^0-9]/g, '');
}