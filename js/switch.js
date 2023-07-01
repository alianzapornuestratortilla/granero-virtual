function swicheaOpción(event) {
    const leSwitchContainer = event.target.closest('div.switch-container');
    const leSwitchStatement = event.target.closest('div.switch-statement');
    const leStatements = leSwitchStatement.querySelectorAll('div.statement');
    const leVariableSpans = leSwitchStatement.querySelectorAll('span.variable');
    // console.log(leVariableSpans);
    const textoIzquierdo = leSwitchContainer.querySelector('strong.izquierda');
    const textoDerecho = leSwitchContainer.querySelector('strong.derecha');
    const daCheckbox = leSwitchContainer.querySelector('input[type="checkbox"]');
    daCheckbox.checked = !daCheckbox.checked;
    daCheckbox.dispatchEvent(new Event('change'));
    textoIzquierdo.classList.remove('seleccionado');
    textoDerecho.classList.remove('seleccionado');
    let ladoSeleccionado
    switch (daCheckbox.checked) {
        case true:
            textoDerecho.classList.add('seleccionado');
            ladoSeleccionado = 'derecho';
            break;
        case false:
            textoIzquierdo.classList.add('seleccionado');
            ladoSeleccionado = 'izquierdo';
            break;

        default:
            window.alert('error inesperado');
            console.error('checkbox de Shrodinger' + leSwitchContainer);
            break;
    }
    for (let i = 0; i < leStatements.length; i++) {
        let leStatement = leStatements[i];
        leStatement.classList.remove('izquierdo');
        leStatement.classList.remove('derecho');
        leStatement.classList.add(ladoSeleccionado);
    }
    for (let i = 0; i < leVariableSpans.length; i++) {
        let leVariableSpan = leVariableSpans[i];
        // console.log(leVariableSpan);
        leVariableSpan.classList.remove('izquierdo');
        leVariableSpan.classList.remove('derecho');
        leVariableSpan.classList.add(ladoSeleccionado);
        // console.log(leVariableSpan.classList);
    }

}

//form div.switch-statement div.statement 