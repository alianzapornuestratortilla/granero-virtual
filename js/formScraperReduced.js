function formScraper(form) {

    let entries = [];
    form.querySelectorAll('div.a-fieldset,switch-statement').forEach(cContainer => {
        let cJSON = [];
        cContainer.querySelectorAll("input,select,textarea,option").forEach(variable => {
            var valorPropiedad;
            switch (variable.type) {
                case 'checkbox':
                    valorPropiedad = variable.checked;
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
            cJSON.push({
                "tag": variable.tagName,
                "id": variable.id,
                "name": variable.getAttribute('name'),
                "tipo": variable.type,
                "valor": valorPropiedad
            });
        });
        entries.push(cJSON);
    });
    return entries;
}
