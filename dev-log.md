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
