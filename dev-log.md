### Thursday, December 28, 2023 @ 12:03:21 PM

Se ha realizado el setup de lo que había de código, habrá que reorganizarlo y la documentación.
Se creó el gihub de la alianza, se intentará subir lo que hay de código como respaldo adicional
Se intentará hacer una copia local de la UI en quant ux 

### Thursday, December 28, 2023 @ 12:55:14 PM

se creó el github y se subió a la rama 'main' pero no fue seamless.

## Thursday, December 28, 2023 @ 07:28:42 PM

Se logró implementar instancia local de quant UX y subir las pantallas

## Sunday, January 14, 2024 @ 08:24:13 PM

Se invirtió orden nombre y fotos, se corrigió diferencia de tamaños de SI y NO en opciones, la animación ahora va y uelvce con el tamaño del text de la opción, se trabajó en la animación para que se vea smooth la aparición y desaparición de entries.
Se tienen que meter los fieldset que aparecen y desaparecen a divs y ponerele el id al div para que no ocupen espacio
Parece que ya quedó que crezcan y decrezcan las opciones de forma animada

## Tuesday, January 16, 2024 @ 03:51:47 PM

Se están haciendo los bototnes
Me dí cuenta qu ehabía error con la tipografía, no decía pero parece ser que era un error CORS por traerla desde el CSS, ahora hay que traerlo desde el html como link
se mejoró los estilos de el selector de fotografías
se removiero unos required que mejor no, lo van a ver en la confirmación
se añadió el precio y la cantidad nominal que hay del 
revisar lo del tamaño de texto, poner todo en rem
elp inter slider no funciona, no se por que, tarda como 3 segundos en cambiar, parece que es problema delrender engine de chromium y waterfoxporque funcoina bien en firefox, sugirtr fprzar reflow con otra propiedad en hhover. Hice el reflow con un filtro de brightness y funcionó,o sé porqué. Hay que aplicarlo a los links delmenú
se tendrá que highlightear el tema de hover para cada switch y demás que no se pongabien el pointer
se ocupa el svg del logo del granero virtual para arreblar lo de la barra de arriba para reacomodarlo todo lineal y mas chaparro


## Wednesday, January 17, 2024 @ 11:48:25 AM

sigue el problema del pointer en chromium 
hay que cambiar el fliter para todos las combinaciones que se muy mal como está
se cambió css para la barra de navegación, aparentemente ya quedó
se trabajó la barra de navegación

## Wednesday, January 17, 2024 @ 05:21:25 PM
se añadió el footer, hay que darle formato
parece que de css salvo colores ya casi no faltamás que lo de los colores en light y dark mode, el footer, los links del menu, etc.
Procederé a meter los blob url de las imágenes en el paquete del form y luego a hacer la página de ver un e-lote
## Wednesday, January 17, 2024 @ 06:14:54 
Puede que lo mejor sea guardar en dataUrl formato webP y guardar y desplegar eso no más let webpURL = canvas2webpURL(laFoto);

### Wednesday, January 17, 2024 @ 08:34:49 PM
mejor siempre con blob, logre que funcionara y se ahorra un 25% de espacio

### Wednesday, January 17, 2024 @ 09:19:41 PM
al parecer el blob se agrega bien, pero los checkbox no estan en en formdata
probando el metodo del hidden input
nah, habrá que crear una funcion que convierta todos los input textarea, select, etc. (y los textos auxiliares, amtesm depsues, de la opcion elejida) del form a un JSON, stringificarlo, y luego a blob

```js
const json = { "name": "John", "age": 30, "city": "New York" };
const blob = new Blob([JSON.stringify(json)], { type: "application/json" });

```

>The square brackets around JSON.stringify(json) are used to create an array containing the stringified JSON object. The Blob constructor expects an array of data as its first argument, so the square brackets are necessary to create an array with a single element that contains the stringified JSON object.

## Thursday, January 18, 2024 @ 11:38:36 AM
Se probara corregir id name igual para todos los input, select, textarea
Thursday, January 18, 2024 @ 12:25:22 PM surgió problema con la función de seleccionar el checkbox ocn clik, el problema es que cuando los atributos name de input y label son iguales al ID del input se revierte el efecto de checarlo programaticmanete. hay que reportarlo como bug a chromium

Thursday, January 18, 2024 @ 04:54:30 PM | Ya quedo la funcion de recogerdor deinputs, ahora a blobificarlo

Thursday, January 18, 2024 @ 07:29:55 PM | Agregue las notas del vendedor, Empiezo a ordenar el js para luego hacer la pñagina de como se ven ya reportado el 
Se ordenó el JS del image formatter, ahora son dos archivos js externos. Se ocupa uno antes en el head y otro después del body, creo porque se definen unas funciones antes pero se ocupan unos eleemntos despuès.odría limpiarse màs

Thursday, January 18, 2024 @ 09:19:58 PM | puse edita elote como solo lectura para evitar cambios accidentales con `chmod 444 ./edita-elote/edita-elote.html `sh de regreso con 774 creo

## Thursday, January 25, 2024 @ 01:25:50 PM

Se empezó mejor con el listado de e-llotes para caso de ver no más como vendedor y para caso de comprador
Se agregó un stilo width 100% para telefono y tablet al body y auto para monitor
SAlen dos '\\' en el Json stringify de `JSON.stringify( formScraper(document.getElementById('form-principal')))`. Hay que revisar después
`JSON.stringify(buildFormData( document.getElementById('form-principal') ) )`
`(await buildFormData( document.getElementById('form-principal') ) ).get('forms-JSON')`
`buildFormData( document.getElementById('form-principal') ) `
`new Blob([JSON.stringify(formScraper(document.getElementById('form-principal')) )], { type: "application/json" });`

Thursday, January 25, 2024 @ 10:12:44 PM | se está pasando a scss, se quedño en linea 720 del css copy, form fieldset
Wednesday, January 31, 2024 @ 06:37:48 PM | funcionalidad de que se cierra el menú cuado das click donde sea pero en el menu
Thursday, February 1, 2024 @ 08:49:05 PM | acabar campos.json los ocndiconales y los que faltan

## Tuesday, February 6, 2024 @ 05:28:10 PM

se concluyó que el formData no se puede ocnvertir en blob, entonces se dificulta que vaya como regrese. de mientras se movió el arbol de opcions y se definió el arbol de entries para resolver como desplegar en dialog. No verifico los criterios elboton de submit. Habrá que hacer un punto común en el que regresan los blob, eliminar en piés de los archivos y lás imágenes más el json de los valores, también para editar el e-lote.

## Friday, February 9, 2024 @ 02:57:42 PM

Friday, February 9, 2024 @ 05:59:56 PM | se corrigió lo del campo requerido vía html. ahora el texto y las cifras que se mmuestran son forzosas, salvo las excepciones con clase `not-required`
popover es muy nuevo y no lohe de usar :(  Usaré dialog que esta soportado desde 2013 en chrome, mas reciente en los demás, pero los demás han de estar más actualizados: edge - microsoft, safari - apple.

agrengando el johnosn su
falta hacer la página de los microorganismos

se agrgó el logo svg con dark mde también

## Sunday, February 11, 2024 @ 03:27:43 PM

se agregó el loader con la flor de maíz
se tiene que quitar la funcion onclick o onmousedown para el botton submit para que chequee los criterios mínimos. ahora se deja no mas porara evitar los revise paradesarrollo

pendiente `function viewELoteDOMg(`js

## Monday, February 12, 2024 @ 04:45:22 PM

edita elote form submit 

aa=(await buildFormData( document.getElementById('form-principal') ))

me quyedé en edita elote form submit línea 97 para evaliar el precio del maíz
podría no más dejar para depsues la validaciñón? no, tengo que saber si lo muestro o lo ignoro ademñas de si están o no mostrados.... o na más se va a ver vacío .... hmmmm

otas web para convertir y usar el File

## Friday, May 17, 2024 @ 08:11:38 PM

moved to mvp
edita elote y busca elote

función para elaborar la revisión de elote antes de submit

diseño de look de elote en lista y pseudofullscreen

## Tuesday, May 21, 2024 @ 08:51:47 PM

got styles more or les working for normal and pseudofullscreen
abandoned other functions, updated form scraper so now it has the files per se. still has to incorporate culling not shown fields (class hidden)
made new map for form-report correspondence, still have to fill in correspondent values, and program speial and generic cases

## Wednesday, May 22, 2024 @ 07:55:16 PM

test buildFormData(), will h ave to JSON parse form-obj

## Tuesday, May 28, 2024 @ 03:29:00 PM

await buildEloteObj(await buildFormData())

works now, returns eLote Obj, at least for form side, will have to do the dbrequest side

dom bouildig por laspiedrtias, ya esta el resumen compacto, línea 556

tal vez cambiar grano registrado por venta mínima

## Wednesday, May 29, 2024 @ 08:11:45 PM

await buildEloteObj(await buildFormData()) produce un elote funional, agregarle pseudofullsrenn
falta ponerlo en dialogue

línea 674 edita elote form submit

## Thursday, May 30, 2024 @ 09:30:49 PM

dialog ya genera elote, falta ajustar para otras patallas además d desktop. se implementó loader para fotos. Sigue verifiar todas las entradas se muestren y no muestren conforme a form.Luego habilitar múltiples imágenes en el selector.