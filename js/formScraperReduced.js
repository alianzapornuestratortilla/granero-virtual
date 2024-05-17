function formScraper(form) {

    let entries = new Object();
    form.querySelectorAll('div.a-fieldset,div.switch-statement').forEach(cContainer => {
        let contenedor = new Object();
        // contenedor["id"] = cContainer.id;
        contenedor["hide"] = cContainer.classList.contains("hide");
        let cJSON = new Object();
        //borré option, probablemente no sea necesario
        cContainer.querySelectorAll("input,select,textarea").forEach(variable => {
            // console.log(variable.name);
            var valorPropiedad;
            let entri = {};
            // entri["hide"] = cContainer.classList.contains("hide");
            switch (variable.type) {
                case 'checkbox':
                    // debugger
                    valorPropiedad = variable.checked;
                    if ( variable.closest("div.switch-container") ) {
                        
                        entri["slider"] = true;
                        let sliderContainer = variable.closest("div.switch-container");
                        entri["izquierda"] = sliderContainer.querySelector("strong.izquierda").innerText;
                        entri["derecha"] = sliderContainer.querySelector("strong.derecha").innerText;
                        
                    }
                    break;
                case 'file':
                    let losFiles = [];
                    
                    if (variable.files.length > 0) {

                        for (let index = 0; index < variable.files.length; index++) {
                            losFiles.push(variable.files[index].name);
                            
                        }                
                    }    
                    valorPropiedad = losFiles;
                    break;

                default:
                    valorPropiedad = variable.value;
                    break;
            }
            entri["tag"] = variable.tagName;
            entri["id"] = variable.id;
            entri["name"] = variable.name;
            entri["tipo"] = variable.type;
            entri["valor"] = valorPropiedad;
            // entri["parent"] = cContainer.id;
            cJSON[variable.name] = entri;
        });
        contenedor["elements"] = cJSON;
        entries[cContainer.id] = (contenedor);
    });
    return entries;
}
