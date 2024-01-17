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

