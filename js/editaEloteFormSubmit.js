async function editaEloteInitSubmit(event) {
    //que no haga lo que tiendría que hacer con el action
    event.preventDefault();
    // let form = event.currentTarget;

    let leDialog = document.getElementById("dialog-revisa-e-lote");
    let loaderContainer = leDialog.querySelector("div.dialog-body");
    loaderSet(loaderContainer);

    //despliega el modal
    leDialog.showModal();
    // let formData = (await buildFormData(document.getElementById('form-principal')));
    // let formInput = JSON.parse(formData.get('form-obj'));    
    // console.log(document.getElementById('form-principal'));
    // console.log(form);
    //Le sourceData line ->
    replaceLoader(loaderContainer, viewELoteDOMg(JSON.parse((await buildFormData(document.getElementById('form-principal'))).get('form-obj'))));

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


async function buildFormData() {

    try {
        //maybe shouldn't construct from the form, as it is built again as a blob. Nope, we need the form for the files
        let formData = new FormData(document.getElementById('form-principal'));
        // debugger
        //for (const key of formData.keys()) {
        //delete each input that isn't a file
        //}


        for (let index = 0; index < webpURLArrAdHoc.length; index++) {
            const webpURL = webpURLArrAdHoc[index];
            // solo append como fotografía, sin nombres distintos
            //formData.append('fotografía[' + index + ']', await dataURL2Blob(webpURL), nameGenerator());
            formData.append('fotografía', await dataURL2Blob(webpURL), nameGenerator());
        }
        //append the blob of the scraped form, named 'forms-JSON'
        //formData.append('forms-JSON', new Blob([JSON.stringify(formScraper(form))], { type: "application/json" }), nameGenerator())
        //formData.append('form-obj', JSON.stringify(formScraper(form)));
        formData.append('form-obj', JSON.stringify(formScraper(document.getElementById('form-principal'))));
        //formData.append('form-obj', formScraper(document.getElementById('form-principal')));
        //formData.append('form-opciones', JSON.stringify(lasOpciones));
        //formData.append('form-árbolDentries', JSON.stringify(árbolDentries));
        //just to see what is in there
        //for (const key of formData.keys()) {console.log(key);}
        // console.log(formData)
        //for (const key of formData.keys()) {
        //    console.log(key);
        //}
        return formData;

    } catch (error) {
        console.error(error);
    }
}

async function buildEloteObj(sourceData) {
    //obtain fields to show, current value
    // debugger
    let eLote = new Object();
    eLote["imágenes"] = [];
    eLote["entradas"] = new Object;
    eLote["archivos"] = new Object(); //"application/octet-stream"
    //eLote["inventario"] = null;
    try {

        //fotos
        for (const foto of sourceData.getAll("fotografía")) {
            //add photos
            //debugger

            const reader = new leFotoReader;

            eLote["imágenes"].push(await logImageData(foto, reader))
        }

        //prune not shown

        let unpruned = JSON.parse(sourceData.get("form-obj"));

        for (const key in unpruned) {

            if (Object.hasOwnProperty.call(unpruned, key)) {

                if (!unpruned[key]["hide"]) {
                    eLote["entradas"][key] = unpruned[key];
                    //entrada["elements"].forEach(element => {
                    //if (element["tag"] == "INPUT" && element["tipo"] == "file") {
                    //    eLote["archivos"][element["name"]] = sourceData.get(element["name"]);
                    //    debugger
                    //}      
                    //});
                }

            } else {
                throw new Error("object no tiene property en el prunning");
            }
        }
        //eLote["opciones"] = JSON.parse(sourceData.get("form-opciones"));
        //eLote["dataTree"] = JSON.parse(sourceData.get("form-árbolDentries"));

        //files
        let filesElements = [
            "fieldset-certificado-orgánico", "fieldset-certificado-libre-de-OGM", "fieldset-análisis-de-aflatoxinas", "fieldset-análisis-NMX-FF-034"
        ];

        for (const fileElement of filesElements) {
            if (fileElement in eLote["entradas"]) {

                try {
                    listaDeArchivos = eLote["entradas"][fileElement]["elements"][Object.keys(eLote["entradas"][fileElement]["elements"])[0]]["valor"]
                } catch (error) {
                    console.error(error + listaDeArchivos);
                }
                let leName = eLote["entradas"][fileElement]["elements"][Object.keys(eLote["entradas"][fileElement]["elements"])[0]]["name"];
                eLote["archivos"][leName] = sourceData.getAll(leName);
            }
        }

    } catch (error) {
        console.log(error);
    }

    return eLote;


}

function buildELoteDOM(eLoteObj) {

    let formELoteMap = {
        "aux-img": false,
        "fieldset-nombre-vendedor": {
            "tipo": "text-as-is",
            "campo": "Vendedor",
            "valor": ""
        },
        "fieldset-teléfono": {
            "tipo": "10-digit-number",
            "campo": "Teléfono",
            "valor": ""
        },
        "switch-mismo-numero": false,
        "fieldset-teléfono-mensaje": {
            "tipo": "10-digit-number",
            "campo": "Whatsapp/Telegram",
            "valor": ""
        },
        "fieldset-nombre-maíz": {
            "tipo": "text-as-is",
            "campo": "Nombre del maíz",
            "valor": ""
        },
        "usos-comunes": {
            "tipo": "checklist",
            "campo": "Usos comunes",
            "list": {
                "tortillas-checkbox": "tortillas normales, festivas y taqueras",
                "garnachas-checkbox": "quesadillas, gorditas, tlacoyos, sopes, huaraches, memelas, itacates, chalupas, tlaxcales, molotes, polcanes y panuchos",
                "tamales-checkbox": "tamales",
                "tostadas-checkbox": "tostadas",
                "tlayudas-checkbox": "tlayudas",
                "pozole-checkbox": "pozole",
                "palomitas-checkbox": "palomitas",
                "pinole-checkbox": "pinole",
                "atole-checkbox": "atole",
                "pozol-checkbox": "pozol",
                "tejate-checkbox": "tejate, tejuino o tascalate",
                "otros-checkbox": "otros"


            }
        },
        "switch-semilla-propia": {
            "tipo": "dichotomous",
            "campo": "Orígen de la semilla",
            "valor": {
                "es propia,": "propia del agricultor, de ciclos pasados",
                "la conseguí": "la consiguió de alguien más, en otro lado"
            }
        },
        "switch-comprada-truequeada": {
            "tipo": "dichotomous",
            "campo": "La obtuvo mediante",
            "valor": {
                "la compré": "compra",
                "la intercambié": "intercambio o trueque"
            }
        },
        "switch-nativo": {
            "tipo": "dichotomous",
            "campo": "Tipo de semilla",
            "valor": {
                "nativo o criollito": "nativo / criollo",
                "híbrido": "híbrido"
            }
        },
        "switch-origen-distinto": false,
        "fieldset-nombre-origen-distinto": {
            "tipo": "text-as-is",
            "campo": "Nombre de quién me facilitó la semilla",
            "valor": ""
        },
        "fieldset-lugar-de-origen": {
            "tipo": "text-as-is",
            "campo": "lugar de orígen de la semilla",
            "valor": ""
        },
        "switch-diversidad-de-cultivo": {
            "tipo": "dichotomous",
            "campo": "Diversidad del cultivo",
            "valor": {
                "acompañado": "En milpa, con frijol, calabaza, quelites",
                "solito": "Maíz solo: monocultivo"
            }
        },
        "switch-uso-de-agroquímicos": {
            "tipo": "dichotomous",
            "campo": "Uso de fertilizantes químicos",
            "valor": {
                "NO": "No usó",
                "SI": "Sí usó"
            }
        },
        "switch-uso-de-abonos": {
            "tipo": "dichotomous",
            "campo": "Uso de abonos naturales",
            "valor": {
                "NO": "No usó",
                "SI": "Sí usó"
            }
        },
        "switch-uso-de-venenos": {
            "tipo": "dichotomous",
            "campo": "Uso de agroquímicos para el control de bichos y/o hierbas",
            "valor": {
                "NO": "No usó",
                "SI": "Sí usó"
            }
        },
        "switch-uso-de-control-biológico": {
            "tipo": "dichotomous",
            "campo": "Uso de productos biológios, orgánicos o naturales para el control de bichos y/o hierbas",
            "valor": {
                "NO": "No usó",
                "SI": "Sí usó"
            }
        },
        "switch-uso-de-rastrojo": {
            "tipo": "dichotomous",
            "campo": "Permanencia de rastrojo sobre el suelo",
            "valor": {
                "NO": "No, el suelo quedó desprotegido",
                "SI": "Si, el suelo quedó protegido"
            }
        },
        "switch-cuenta-con-certificación": false,
        "switch-cuenta-con-certificación-orgánica": false,
        "fieldset-certificado-orgánico": {
            "tipo": "files",
            "campo": "Certificado orgánico",
            "valor": true
        },
        "switch-cuenta-con-certificación-libre-de-OGM": false,
        "fieldset-certificado-libre-de-OGM": {
            "tipo": "files",
            "campo": "Certificado libre de OGM",
            "valor": true
        },
        "fieldset-precio-por-unidad-de-medida-per-sé": {
            "tipo": "price",
            "campo": "Precio",
            "valor": true
        },
        "fieldset-cantidad-de-grano-disponible-per-sé": {
            "tipo": "amount",
            "campo": "Disponible para la compra",
            "valor": true
        },
        "fieldset-cantidad-mínima-de-venta": {
            "tipo": "amount",
            "campo": "Cantidad mínima de compra",
            "valor": true
        },
        "switch-secado": {
            "tipo": "dichotomous",
            "campo": "Tipo de secado",
            "valor": {
                "artesanal": "artesanal",
                "tecnificada": "tecnificado"
            }
        },
        "switch-desgranado": {
            "tipo": "dichotomous",
            "campo": "Desgranado",
            "valor": {
                "artesanal": "artesanal",
                "tecnificada": "tecnificado"
            }
        },
        "switch-conservación": {
            "tipo": "dichotomous",
            "campo": "Preservación del grano",
            "valor": {
                "NO": "No implemento medidas de protección para el grano",
                "SI": "Si implemento medidas de protección para el grano"
            }
        },
        "fieldset-cual-conservación": {
            "tipo": "checklist",
            "campo": "Método de preservación del grano",
            "list": {
                "cal-checkbox": "Se utilizó cal ",
                "fosfuro-checkbox": "Se utilizaron pastillas de fosfuro"
            }
        },
        "fieldset-lugar-de-almacén": {
            "tipo": "5-digit-number",
            "campo": "Código postal donde se enuentra el grano",
            "valor": ""
        },
        "switch-cuenta-con-análisis-de-aflatoxinas": false,
        "fieldset-análisis-de-aflatoxinas": {
            "tipo": "files",
            "campo": "Análisis de aflatoxinas",
            "valor": true
        },
        "switch-cuenta-con-NMX-FF-034": false,
        "fieldset-análisis-NMX-FF-034": {
            "tipo": "files",
            "campo": "Análisis NMX-FF-03",
            "valor": true
        },
        "switch-servicios": false,
        "fieldset-servicios-descripción": {
            "tipo": "text-as-is",
            "campo": "Servicios adicionales que se pueden prestae",
            "valor": ""
        },
        "fieldset-notas-del-vendedor": {
            "tipo": "text-as-is",
            "campo": "Notas adicionales del vendedor",
            "valor": ""
        },
    };

    let leELote = document.createElement("div");
    leELote.classList.add("un-e-lote");
    let leMultiFoto = document.createElement("div");
    leMultiFoto.classList.add("multi-foto");

    if (eLoteObj["imágenes"].length > 0) {
        let leFotoPrincipal = document.createElement("div");
        leFotoPrincipal.classList.add(...["foto", "principal"]);
        let leImgPrimaria = document.createElement("img");
        leImgPrimaria.classList.add("primaria");
        leImgPrimaria.setAttribute("src", eLoteObj["imágenes"][0]);
        leFotoPrincipal.appendChild(leImgPrimaria);
        leMultiFoto.appendChild(leFotoPrincipal);
        let leFotoSecundaria = document.createElement("div");
        leFotoSecundaria.classList.add(...["foto", "secundaria"]);
        let restoImágenes = eLoteObj["imágenes"];
        restoImágenes.shift();
        for (let index = 0; index < ((restoImágenes.length < 3) ? restoImágenes.length : 3); index++) {

            let leImgCont = document.createElement("div");
            leImgCont.classList.add("img-container");
            let leImgSec = document.createElement("img");
            leImgSec.classList.add("secundaria");
            leImgSec.setAttribute("src", restoImágenes[index]);
            leImgCont.appendChild(leImgSec);
            leFotoSecundaria.appendChild(leImgCont);
        }
        leMultiFoto.appendChild(leFotoSecundaria);

    }

    leELote.appendChild(leMultiFoto);
    // let leResumenCompacto = document.createElement("div");
    // leResumenCompacto.classList.add(...["resumen", "compacto", "elote-lista"]);

    // leResumenCompacto.appendChild(buildItemResumen(["nombre-e-lote-lista", "dato", "0", "lista"],"Nombre del maíz",eLoteObj["entradas"]["fieldset-nombre-maíz"]["elements"]["input-nombre-completo"]["valor"]));
    // delete eLoteObj["entradas"]["fieldset-nombre-maíz"]; 
    // leResumenCompacto.appendChild(buildItemResumen(["dato", "1", "lista"],"Cantidad registrada",eLoteObj["entradas"]["fieldset-cantidad-de-grano-disponible-per-sé"]["elements"]["cantidad-de-grano-disponible-per-sé"]["valor"] + " " + eLoteObj["entradas"]["fieldset-cantidad-de-grano-disponible-per-sé"]["elements"]["unidad-de-medida-cantidad-per-sé"]["valor"]));
    // delete eLoteObj["entradas"]["fieldset-cantidad-de-grano-disponible-per-sé"];
    // leResumenCompacto.appendChild(buildItemResumen(["dato", "2", "lista"],"Precio","$ "+ eLoteObj["entradas"]["fieldset-precio-por-unidad-de-medida-per-sé"]["elements"]["precio-por-unidad-de-medida-per-sé"]["valor"] + eLoteObj["entradas"]["fieldset-precio-por-unidad-de-medida-per-sé"]["elements"]["unidad-de-medida-precio-per-sé"]["valor"]));
    // delete eLoteObj["entradas"]["fieldset-precio-por-unidad-de-medida-per-sé"];
    // leELote.appendChild(leResumenCompacto);

    // let leResumenExtendido = document.createElement("div");
    // leResumenExtendido.classList.add(...["resumen", "extendido", "elote-lista"]);

    for (const key of Object.keys(eLoteObj["entradas"])) {
        delete eLoteObj["entradas"]["aux-img"];
        if (Object.hasOwnProperty.call(formELoteMap, key)) {
            const leEntry = eLoteObj["entradas"][key];
            const leKernel = formELoteMap[key]
            //console.log(leEntry);
            //console.log(leKernel);

            switch (typeof (formELoteMap[key])) {
                case 'object':
                    let price = false;
                    switch (formELoteMap[key]["tipo"]) {
                        case "text-as-is":
                        case "10-digit-number":
                        case "5-digit-number":
                            // let thisEntry = Object.keys(eLoteObj["entradas"][key]["elements"])[0];
                            formELoteMap[key]["valor"] = eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]]["valor"];
                            break;
                        case "dichotomous":
                            //get values                       

                            formELoteMap[key]["valor"] = formELoteMap[key]["valor"][eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]][eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]]["valor"] ? "derecha" : "izquierda"]];

                            // console.log(formELoteMap[key]["valor"]);

                            break;
                        case "price":
                            price = true;
                        case "amount":
                            let leConector = "";
                            if (price) {
                                formELoteMap[key]["valor"] = `<span style="font-variant-caps: all-small-caps;">mxn</span>` + " $ ";
                                leConector = " por "
                            } else {
                                formELoteMap[key]["valor"] = "";
                                leConector = " "
                            }

                            formELoteMap[key]["valor"] = formELoteMap[key]["valor"] + eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]]["valor"] + leConector + eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[1]]["valor"];


                            break;
                        case "checklist":
                            // debugger
                            formELoteMap[key]["valor"] = "";
                            for (const checkbox of Object.keys(eLoteObj["entradas"][key]["elements"])) {

                                if (eLoteObj["entradas"][key]["elements"][checkbox]["valor"]) {
                                    formELoteMap[key]["valor"] = formELoteMap[key]["valor"] + formELoteMap[key]["list"][checkbox] + ` &#13;`
                                }
                            }
                            // console.log(formELoteMap[key]["valor"]);    
                            // debugger
                            break;
                        case "files":

                            // eLoteObj["entradas"][key]["elements"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]]["valor"]
                            // eLoteObj["archivos"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]]
                            formELoteMap[key]["valor"] = [];
                            let fileArray = eLoteObj["archivos"][Object.keys(eLoteObj["entradas"][key]["elements"])[0]];
                            if (fileArray.length > 0) {
                                for (const daFile of fileArray) {

                                    let aLink = document.createElement('a');
                                    aLink.innerText = daFile.name;
                                    aLink.download = daFile.name;
                                    // const reader = new leFotoReader;
                                    // aLink.setAttribute("href",await logImageData(daFile, reader));
                                    aLink.setAttribute("target", "_blank");
                                    aLink.setAttribute("href", URL.createObjectURL(daFile));

                                    formELoteMap[key]["valor"].push(aLink);
                                }
                            } else {
                                delete eLoteObj["archivos"][Object.keys(eLoteObj["entradas"][key])];
                                delete eLoteObj["entradas"][Object.keys(eLoteObj["entradas"][key])];
                            }

                            break;
                        default:
                            throw new Error("Falto el tipo " + formELoteMap[key]["tipo"] + " en el tipo de entry del eLote");
                            break;
                    }
                    break;
                case 'boolean':
                    if (formELoteMap[key]) {
                        throw new Error(key + " está como true, nadie debería ser true");
                        break;
                    } else {
                        delete eLoteObj["entradas"][key];
                    }
                    break;
                default:
                    throw new Error(key + " ni objeto ni booleano");
                    break;
            }




        } else {
            throw new Error("key " + key + " no se enuentra en formEloteMap");
        }
    }

    let items = ["fieldset-nombre-maíz",
        "fieldset-cantidad-mínima-de-venta",
        "fieldset-precio-por-unidad-de-medida-per-sé"];
    //console.log("como quedó al final");
    //console.log(eLoteObj["entradas"]);

    leELote.appendChild(buildResumen(formELoteMap, eLoteObj, "compacto", items));
    leELote.appendChild(buildResumen(formELoteMap, eLoteObj, "extendido", Object.keys(eLoteObj["entradas"])));
    document.getElementById("form-principal").appendChild(leELote);;
    debugger
    return leELote;
}

function buildItemResumen(classes, legend, strong) {
    let leDAto = document.createElement("div");
    leDAto.classList.add(...classes);
    let leLegend = document.createElement("legend");
    leLegend.innerText = legend;
    leDAto.appendChild(leLegend);
    let leStrong = document.createElement("strong");
    leStrong.classList.add("valor");
    switch (typeof (strong)) {
        case 'string':
            leStrong.innerHTML = strong;
            break;
        case 'object':
            switch (strong instanceof Array) {
                case true:
                    for (const sumLink of strong) {
                        leStrong.appendChild(sumLink);
                    }
                    break;

                default:
                    debugger
                    console.error(legend);
                    console.error(strong);
                    throw new Error("valor no es Array");
                    break;
            }

            break
        default:
            debugger
            console.error(legend);
            console.error(strong);
            throw new Error("valor no es ni objeto");
            break;
    }

    //leDAto.appendChild(leStrong);
    return leDAto;
}

function buildResumen(formELoteMap, eLoteObj, tipo, items) {

    let classesNstuff = {};

    let leResumen = document.createElement("div");
    leResumen.classList.add(...["resumen", tipo, "elote-lista"]);
    switch (tipo) {
        case "compacto":
            if (items.length == 3) {
                let sumClasses = [
                    ["nombre-e-lote-lista", "dato", "0", "lista"],
                    ["dato", "1", "lista"],
                    ["dato", "2", "lista"]
                ];
                for (let index = 0; index < items.length; index++) {
                    classesNstuff[items[index]] = sumClasses[index];
                }
            } else {
                throw new Error("items for compacto different than 3");
            }
            break;
        case "extendido":

            for (const key of items) {
                classesNstuff[key] = ["lista"];
            }

            break;
        default:
            throw new Error("tipo de resumen inexistente");
            break;
    }

    for (const leElemen of Object.keys(classesNstuff)) {
        
        leResumen.appendChild(buildItemResumen(classesNstuff[leElemen], formELoteMap[leElemen]["campo"], formELoteMap[leElemen]["valor"]));
        delete eLoteObj["entradas"][leElemen];
    }
    return leResumen;

}



async function viewELoteDOMg(eLoteObj) {





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
    elem0.appendChild(createDatoLista({ "classList": ["nombre-e-lote-lista", "dato", "0", "lista"] }, { "classList": [], "texto": eLote["dataTree"]["input-nombre-completo"]["título"] }, { "texto": eLote["entradas"]["fieldset-nombre-maíz"]["elements"]["input-nombre-completo"]["valor"], "classList": "valor" }));

    let decis = {
        "verificar-edición": {
            "per-sé": {
                "items": [
                    { "origen": "form", "item": "precio-por-unidad-de-medida-per-sé" },
                    { "origen": "form", "item": "cantidad-de-grano-disponible-per-sé" }
                ],
                1: {
                    "div": {
                        "classList": ["dato", "1", "lista"],
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
                2: {
                    "div": {
                        "classList": ["dato", "2", "lista"],
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

    elem0.appendChild(createDatoLista(segundosCompacto[1]["div"]["classList"], segundosCompacto[1]["div"]["children"]["legend"], segundosCompacto[1]["div"]["children"]["strong"]));
    elem0.appendChild(createDatoLista(segundosCompacto[2]["div"]["classList"], segundosCompacto[2]["div"]["children"]["legend"], segundosCompacto[2]["div"]["children"]["strong"]));
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

