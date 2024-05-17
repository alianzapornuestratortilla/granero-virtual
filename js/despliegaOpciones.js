
function checkboxTranslator(daValue) {
    let lado;
    switch (daValue) {
        case true:
            lado = "derecha";
            break;
        case false:
            lado = "izquierda";
            break

        default:
            console.error('checkbox de shrodinger');
            lado = false;
            break;

    }
    return lado;
}

function ladoOpuesto(elLado) {
    let lado;
    switch (elLado) {
        case "izquierda":
            lado = "derecha";
            break;
        case "derecha":
            lado = "izquierda";
            break

        default:
            console.error('lado de shrodinger');
            lado = false;
            break;

    }
    return lado;
}


function despliegaOcultaOpciones(childrenOfParentComponent, show, inventarioDeSwitches) {
    //debugger

    for (const currentComponentKey in childrenOfParentComponent) {


        const currentComponent = childrenOfParentComponent[currentComponentKey];
        const currentComponentInDOM = document.getElementById(currentComponentKey);
        let isRequired
        // debugger
        switch (show) {
            case "show":
                // mostrarlo si está oculto

                if (currentComponentInDOM.classList.contains('hide')) {
                    currentComponentInDOM.classList.remove("hide");
                }

                isRequired = true;
                break;
            // si es switch y en mostrar, evalua valor, si no                
            case "hide":
                // solo ocultalo
                currentComponentInDOM.classList.add("hide");
                isRequired = false;

                break;

            default:

                break;
        }

        let leInput = currentComponentInDOM.querySelector('input');
        console.log(leInput);

        if (leInput) {
            if (leInput.type == "text" || leInput.type == "number") {
                if (!leInput.classList.contains("not-required")) {
                    console.log(leInput.name + "  |  " + leInput.type);
                    leInput.required = isRequired;
                }

            }
        }


        // currentComponentInDOM.querySelector('input').required = isRequired;

        if ((currentComponent.hasOwnProperty("izquierda") && currentComponent.hasOwnProperty("derecha"))) {
            //es switch
            let components2beDisplayed = new Array();
            let components2beHidden = new Array();
            switch (show) {
                case "show":
                    //chequea status del switch
                    const currentSwitchStatement = currentComponentKey;
                    const currentLado = inventarioDeSwitches[currentSwitchStatement];
                    const currentSwitch = childrenOfParentComponent[currentSwitchStatement];
                    components2beDisplayed.push(currentSwitch[currentLado]);
                    components2beHidden.push(currentSwitch[ladoOpuesto(currentLado)]);
                    break;
                case "hide":
                    // oculta sus descendientes de de ambos lados
                    components2beHidden.push(currentComponent["izquierda"]);
                    components2beHidden.push(currentComponent["derecha"]);
                    break;

                default:
                    break;
            }

            //ocultar lado opuesto y todos los descendientes
            components2beHidden.forEach(component => {
                void despliegaOcultaOpciones(component, "hide", inventarioDeSwitches);
            });

            // mostrar lado seleccionado evaluando
            components2beDisplayed.forEach(component => {
                void despliegaOcultaOpciones(component, "show", inventarioDeSwitches);
            });

        }
        // si no es switch ya estuvo bueno

    }


}

function despliegalasOpciones(diccionarioDeOpciones) {

    const daSwitches = document.querySelectorAll('label.switch input[type="checkbox"]');
    let daSwitchInventory = new Object();
    for (let i = 0; i < daSwitches.length; i++) {
        let daSwitch = daSwitches[i];
        daSwitchInventory[daSwitch.closest('div.switch-statement').id] = checkboxTranslator(daSwitch.checked);
    }
    void despliegaOcultaOpciones(diccionarioDeOpciones, "show", daSwitchInventory);
}
