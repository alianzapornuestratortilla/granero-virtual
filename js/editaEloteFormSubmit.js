async function editaEloteInitSubmit(event) {
    //que no haga lo que tiendría que hacer con el action
    event.preventDefault();
    let form = event.currentTarget;

    let leDialog = document.getElementById("dialog-revisa-e-lote");
    let loaderContainer = leDialog.querySelector("div.dialog-body");
    loaderSet(loaderContainer);

    //despliega el modal
    leDialog.showModal();

    replaceLoader(loaderContainer, viewELoteDOMg());
    //para cada input, verificar si está mostrado de acuerdo a opciones 
    //verificicar  si cumple los criterios
    //
}

function loaderSet(loadingHost) {
    //función para gestionar la aparición y desaparición del loading
    // loading host es un elemento que contendrá el loading widget. 
    // request es 
    //colocar loader-maíz si aún no existe
    if (!loadingHost.querySelector("div.cargando")) {
        //  crear un div.cargando
        let loader = document.createElement("div");
        //  agregarle el chico y cargando class
        loader.classList.add("cargando");
        loader.classList.add("mediano");
        //  agregarle el svg y demás
        loader.appendChild(getElementFromTemplate('loader-maíz'));

        loadingHost.appendChild(loader);
    }
}

function loaderUnSet(loadingHost) {
    let loader = loadingHost.querySelector("div.cargando");
    if (loader) {

        loadingHost.removeChild(loader);
    }
}

function replaceLoader(loadingHost, element) {
    //reemplaza el loader en loadinghost con element
    loaderUnSet(loadingHost);
    loadingHost.appendChild(element);
}



async function dialogueVerElote() {
    let formData = (await buildFormData(document.getElementById('form-principal')));
    let formInput = JSON.parse(formData.get('form-obj'));
    let fotos = formData.getAll('fotografía');

    lasOpciones

    for (const key in árbolDdatos) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];

        }
    }

}
/*
async function validateForm(form) {
    let validation = new Object();//regrese este objeto que dice si son o no válidos
    // validar form data
    //form = document.getElementById('form-principal')
    let leFormData = (await buildFormData(form));
    // make sure value is valid
    //recorrer los elementos que si están mostrados y validar con el datatree árbolDentries[name]
    // obtener todo del form: opciones, arbolDentries, valores
    let valoraciónTree = JSON.parse(leFormData.get("form-árbolDentries"));
    for (const key in JSON.parse(leFormData.get("form-obj"))) {
        const element = object[key];
        if (!element["hide"]) {
            element["elements"].forEach(elementiito => {
                let valoración = valoraciónTree[elementiito["name"]];
                let validez = true;
                if (valoración.hasOwnProperty("condicional")) {
                    if (valoración["condicional"] === "válido") {
                        if (valoración.hasOwnProperty("ignorar") || valoración.hasOwnProperty("válido")) {
                            validez = false;
                            let toEval = ["ignorar","válido"];
                            toEval.forEach(eval => {
                                if (valoración.hasOwnProperty(eval)) {
                                    validez = validez || valorarLen(elementiito, valoración, eval);    
                                }                                
                                
                            });
                            
                        } else if (valoración.hasOwnProperty("nativo") && valoración.hasOwnProperty("híbrido")) {

                        } else {
                            throw new Error("árbolDEntries tiene " + elementiito["name"] + "para validar pero sin ignorar o validar");
                        }

                    }
                }
                validation[elementiito["name"]] = validez;

            });

        }

    }

    function valorarLen(elem, valoración, qué) {
        let validity = false;
        if (valoración[qué].hasOwnProperty("len")) {
            let leLenObj = valoración[qué]["len"];
            for (const key in leLenObj) {
                if (Object.hasOwnProperty.call(leLenObj, key)) {
                    const operator = leLenObj[key];
                    if (lenTester(lenCampo(elem), operator, leLenObj[operator])) {
                        validity = validity || true;
                    } else {
                        validity = validity || false;
                    }
                }
            }            

        }
        return validity;
    }

    function lenTester(left, operator, right) {
        switch (operator) {
            case ">":
                return (left > right);
                break;
            case ">=":
                return (left >= right);
                break;
            case "<":
                return (left < right);
                break;
            case "<=":
                return (left <= right);
                break;
            case "==":
                return (left == right);
                break;
            case "!=":
                return (left != right);
                break;

            default:
                throw new Error("se utilizó un operador no válido");
                break;
        }
    }

    function lenCampo(elem) {
        let tipo = elem["tipo"];
        let valor = elem["valor"];
        let value;
        switch (tipo) {
            case "number":
                value = valor.toString();
                break;
            case "text":
            case "file":
                value = valor;
                break;
            default:
                throw new Error("campo " + elem["name"] + " con Len pero no es number, file o text");
                break;
        }
        return value.length;
    }

}
*/


async function viewELoteDOMg(sourceData, form) {

    //obtain fields to show, current value
    let eLote = new Object();
    eLote["imágenes"] = [];
    eLote["archivos"] = new Object(); //"application/octet-stream"
    elote["inventario"] = null;

    if (sourceData) {
        switch (sourceData instanceof FormData) {
            case true:
                for (const foto of sourceData.getAll("fotografía")) {
                    eLote["imágenes"].push(await blob2dataURL(foto));
                }
                eLote["entradas"] = JSON.parse(sourceData.get("form-obj"));
                for (const key in eLote["entradas"]) {
                    if (Object.hasOwnProperty.call(eLote["entradas"], key)) {
                        const entrada = eLote["entradas"][key];
                        if (!entrada["hide"]) {
                            entrada["elements"].forEach(element => {
                                if (element["tag"] == "INPUT" && element["tipo"] == "file") {
                                    eLote["archivos"][element["name"]] = sourceData.get(element["name"]);
                                }
                            });
                        }

                    }
                }
                eLote["opciones"] = JSON.parse(sourceData.get("form-opciones"));
                eLote["dataTree"] = JSON.parse(sourceData.get("form-árbolDentries"));


                break;
            case false:
                //es recibido por fetch, los tresobjetos
                //3 objetos:
                //inputs number, text, select, text area
                //archivos (blob) de input file
                //fotos  
                break;
            default:
                throw new Error("sourceData no es ni uno ni otro");
                break;
        }
        // ya estando todo ahora pasar a DOM regresar DOM creado
        //DOMgen4viewer
    } else {
        throw new Error("no hay sourceData");
    }



    //crear mini-dom
    // tipo puede ser verifica o ver no más
    // view e-lote DOM generator
    let container = document.createElement("div");
    container.classList.add("e-lote-view-full");
    let fotoContainer = document.createElement("div");
    fotoContainer.classList.add("photo-bar");
    let foto = document.createElement("img");
    fotoprev.setAttribute("href",);
    // fotoContainer.classList.add("foto-container");
    // fotoContainer.classList.add("carousel");
    // fotoContainer.appendChild(testCarousel());
    // container.appendChild(fotoContainer);
    // return container;


}

function DOMgen4viewer(sizeOfView, typeOfView, eLote) {
    //size of VIEW ES mini o grande
    //typeofview es verificar-edición, vendedor ó visar

    // imágenes
    let children = [];
    let elem0 = document.createElement("div");
    elem0.classList.add("multi-foto");
    let elem1 = document.createElement("div");
    elem1.classList.add("foto");
    elem1.classList.add("principal");
    let elem2 = document.createElement("div");
    elem2.classList.add("foto");
    elem2.classList.add("secundaria");
    imágenes.forEach((fotoURL, index) => {
        let elem = document.createElement("img");
        elem.classList.add("pseudocanvas");
        elem.setAttribute("href", fotoURL);
        elem.setAttribute("order", index);
        elem.setAttribute("onmousedown", "openCarousel(event)")
        if (index == 0) {
            elem.classList.add("primaria");
            elem1.appendChild(elem);
        } else {
            elem.classList.add("secundaria");
            elem2.appendChild(elem);
        }
    });
    elem0.appendChild(elem1);
    elem0.appendChild(elem2);
    children.push(elem0);
    //resumen compacto e-lote-lista
    elem0 = document.createElement("div");
    elem0.classList.add(...["resumen", "compacto", "elote-lista"]);
    elem0.appendChild(createDatoLista({ "classList": ["nombre-e-lote-lista", "dato", "0", "lista"] }, { "classList": [], "texto": eLote["dataTree"]["input-nombre-completo"]["título"] }, { "texto": eLote["entradas"]["fieldset-nombre-maíz"]["elements"]["input-nombre-completo"]["valor"], "classList": "valor"}));

    let decis = {
        "verificar-edición": {            
            "per-sé": {
                "items": [
                    {"origen": "form", "item":"precio-por-unidad-de-medida-per-sé"},
                    {"origen": "form", "item":"cantidad-de-grano-disponible-per-sé"}
                ],
                1:{
                    "div":  {
                        "classList": ["dato", "1","lista"],
                        "children": {
                            "legend": {
                                "classList": ["valor"],
                                "texto": eLote["dataTree"]["precio-por-unidad-de-medida-per-sé"]["título"]
                            },
                            "strong": {
                                "classList": ["valor"],
                                "texto": eLote["entradas"]["fieldset-precio-por-unidad-de-medida-per-sé"]["elements"]["precio-por-unidad-de-medida-per-sé"]["valor"] + " " + eLote["entradas"]["fieldset-precio-por-unidad-de-medida-per-sé"]["elements"]["unidad-de-medida-precio-per-sé"]["valor"],
                                "span": { "classList": ["show-monitor"], "texto": " vendidas" }
                            }
                        }
                    }
                },
                2:{
                    "div":  {
                        "classList": ["dato", "2","lista"],
                        "children": {
                            "legend": {
                                "classList": ["valor"],
                                "texto": eLote["dataTree"]["precio-por-unidad-de-medida-per-sé"]["título"]
                            },
                            "strong": {
                                "classList": ["valor"],
                                "texto": eLote["entradas"]["fieldset-cantidad-de-grano-disponible-per-sé"]["elements"]["cantidad-de-grano-disponible-per-sé"]["valor"] + " " + eLote["entradas"]["fieldset-cantidad-de-grano-disponible-per-sé"]["elements"]["unidad-de-medida-cantidad-per-sé"]["valor"],
                                "span": { "classList": ["show-monitor"], "texto": " vendidas" }
                            }
                        }
                    }
                }
            }
        },
        "visar": true
    }
    const segundosCompacto = decis[typeOfView]["per-sé"];
    
    elem0.appendChild(createDatoLista(segundosCompacto[1]["div"]["classList"],segundosCompacto[1]["div"]["children"]["legend"],segundosCompacto[1]["div"]["children"]["strong"]));
    elem0.appendChild(createDatoLista(segundosCompacto[2]["div"]["classList"],segundosCompacto[2]["div"]["children"]["legend"],segundosCompacto[2]["div"]["children"]["strong"]));
    children.push(elem0);
    //los demás
    let doneAlreadyList = [];
    decis[typeOfView]["per-sé"]["items"].forEach(item => {
        doneAlreadyList.push(item["item"]);
    });
    for (const key in eLote["entradas"]) {
        if (Object.hasOwnProperty.call(eLote["entradas"], key)) {
            const fieldset = eLote["entradas"][key];
            if (!fieldset["hide"]) {
                for (const elemenN in fieldset["elements"]) {
                    if (Object.hasOwnProperty.call(fieldset["elements"], elemenN)) {
                        const element = fieldset["elements"][elemenN];
                        let doneAlready = false;
                        doneAlreadyList.forEach(item => {
                            if (elemenN == item) {
                                doneAlready = doneAlready || true;
                            }
                        });
                        if (!doneAlready) {
                            //not units select
                            //check if it needs units
                            switch (elemenN) {
                                case 'unidad-de-medida-cantidad-per-sé':
                                case "unidad-de-medida-precio-per-sé":
                                    
                                    break;
                            
                                default:
                                    break;
                            }
                            elemenN
                        }
                    }
                }
                
            }        
            
            
        }
    }
}

function addClasses(classes, element) {
    // classes es un array de las clases a añadir
    element.classList.add(...classes);
}

function buildarams() {
    
}

function createDatoLista(div, legend, strong) {
    //div classes es un array de las clases a añadir
    let elem1 = document.createElement("div");
    elem1.classList.add(...div["classList"]);
    let elem2 = document.createElement("legend");
    elem2.classList.add(...legend["classList"]);
    elem2.innerText = legend["texto"];
    elem1.appendChild(elem2);
    elem2 = document.createElement("strong");
    elem2.classList.add(...strong["classList"]);
    elem2.innerText = strong["texto"]
    if (strong["span"]) {
        let elem3 = document.createElement("span");
        elem3.classList.add(...strong["span"]["classList"]);
        elem3.innerText = strong["span"]["texto"];
        elem2.appendChild(elem3);
    }
    elem1.appendChild(elem2);
    return elem1;
}

function camposMostrados(form) {
    let shownFields = [];
    //definir que camos son visibles y por lo tanto evaluables
    //obtener cada switch statement y a-form, evaluar si estan o no visibles poner el name del input selet o textarea a la lista
    form.querySelectorAll('div.a-fieldset,div.switch-statement').forEach(fieldContainer => {
        //  Está visible ?  listalos : next
        if (!fieldContainer.classList.contains("hide")) {
            fieldContainer.querySelectorAll("input,select,textarea").forEach(element => {
                shownFields.push(element.getAttribute("name"));
            });
        }
    });
    return shownFields;
}

