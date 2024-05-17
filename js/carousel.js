//construir el carousel
function buildCarousel(fotos) {
    //fotos es un array con el número de fotos, con mínimo una
    //  crear section class="carousel" aria-label="Gallery"
    let carousel = document.createElement("section");
    carousel.classList.add("carousel");
    //  crear ol class="carousel__viewport"
    let carouselViewport = document.createElement("ol");
    carouselViewport.classList.add("carousel__viewport");
    //  crear aside class="carousel__navigation"
    let carouselNavigation = document.createElement("aside");
    carouselNavigation.classList.add("carousel__navigation");
    //  crear ol class="carousel__navigation-list"
    let carouselNavigationList = document.createElement("ol");
    carouselNavigationList.classList.add("carousel__navigation-list");
    //  obtener el número de imágenes
    //  para cada imagen
    for (let index = 0; index < fotos.length; index++) {

        //      crear li tabindex="0" class="carousel__slide" id="carousel__slide{#}"
        let leli = document.createElement("li");
        leli.classList.add("carousel__slide");
        leli.setAttribute("tabindex", "0");
        leli.id = "carousel__slide" + index.toString();
        //      crear img src con el url de la imagen
        let leFoto = document.createElement("img");
        leFoto.setAttribute("src", fotos[index]);
        //      append img src a li tabindex="0"
        leli.appendChild(leFoto)
        //      crear div class="carousel__snapper"
        let carouselSnaper = document.createElement("div");
        carouselSnaper.classList.add("carousel__snapper");
        
        //      crear <a href="#carousel__slide{# - 1}" class="carousel__prev">Go to last slide</a>
        let prev= document.createElement("a");
        prev.setAttribute("href", "#carousel__slide" + (index == 0 ?  (fotos.length - 1) : (index - 1 ).toString() ) );
        prev.classList.add("carousel__prev");
        //      append a href="#carousel__slide{# - 1} to div class="carousel__snapper"
        carouselSnaper.appendChild(prev);
        //      crear <a href="#carousel__slide{# + 1}" class="carousel__next">Go to next slide</a>
        let next= document.createElement("a");
        next.setAttribute("href", "#carousel__slide" + (index == (fotos.length - 1) ?  0 : (index + 1 ).toString() ) );
        next.classList.add("carousel__next");                
        //      append a href="#carousel__slide{# + 1} to div class="carousel__snapper"
        carouselSnaper.appendChild(next);
        //      append div class="carousel__snapper" to li tabindex="0" class="carousel__slide" id="carousel__slide{#}"
        leli.appendChild(carouselSnaper);
        //      append  li  li tabindex="0" class="carousel__slide" id="carousel__slide{#}" to ol class="carousel__viewport
        carouselViewport.appendChild(leli);
        //      crear li class="carousel__navigation-item"
        leli = document.createElement("li");
        leli.classList.add("carousel__navigation-item");
        //      crear <a href="#carousel__slide{#}" class="carousel__navigation-button">Go to slide {#}</a>
        let slide= document.createElement("a");
        slide.setAttribute("href", "#carousel__slide" + index.toString() );
        slide.classList.add("carousel__navigation-button");
        //      append <a href="#carousel__slide{#}" a li class="carousel__navigation-item"
        leli.appendChild(slide);
        //      append li class="carousel__navigation-item" a ol class="carousel__navigation-list"
        carouselNavigationList.appendChild(leli);
        
    }
    //      append ol class="carousel__navigation-list" a aside class="carousel__navigation"
    carouselNavigation.appendChild(carouselNavigationList);
    //append  ol class="carousel__viewport a section class="carousel"
    carousel.appendChild(carouselViewport);
    //append aside class="carousel__navigation" a section class="carousel"
    carousel.appendChild(carouselNavigation);
    // return section class="carousel"
    return carousel;
}

function testCarousel(what) {
    let fotos = [
        "https://placehold.co/800x600/orange/white",
        "https://placehold.co/800x600/blue/white",
        "https://placehold.co/800x600/green/white",
        "https://placehold.co/800x600/pink/white",
        "https://placehold.co/800x600/magenta/white",
        "https://placehold.co/800x600/black/white"
    ];
    switch (what) {
        case "body":
            document.body.appendChild(buildCarousel(fotos));
            return 0;
            break;
    
        default:
            return buildCarousel(fotos);
            break;
    }
    
}