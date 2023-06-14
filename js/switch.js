function swicheaOpción(event) {
    const leSwitchContainer = event.target.closest('div.switch-container');
    const textoIzquierdo = leSwitchContainer.querySelector('strong.izquierda');
    const textoDerecho = leSwitchContainer.querySelector('strong.derecha');
    const daCheckbox = leSwitchContainer.querySelector('input[type="checkbox"]');
    daCheckbox.checked = !daCheckbox.checked;
    textoIzquierdo.classList.remove('seleccionado');
    textoDerecho.classList.remove('seleccionado');
    switch (daCheckbox.checked) {
        case true:
            textoDerecho.classList.add('seleccionado');
            break;
        case false:
            textoIzquierdo.classList.add('seleccionado');
            break;
    
        default:
            break;
    }
}