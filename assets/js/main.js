const formulario = document.querySelector("form")
/* console.log(formulario); */

formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("Hola");
    const busqueda = document.querySelector("input").value

    window.location.href = `busqueda.html?value=${busqueda}`;
})

const urlCapitulos = "https://api.jikan.moe/v4/watch/episodes"
const capitulos = document.getElementById("capitulos")


fetch(urlCapitulos).then(resp => resp.json()).then(datos => {
  
    const episodios = datos.data

    episodios.forEach((episodio,index) =>{
        if(index < 20){
           
            const info = {
                imagen: episodio.entry.images.jpg.image_url,
                titulo: episodio.entry.title,
                episodios: episodio.episodes[0].mal_id
            }
    
            const template = `<div class="col mb-4">
                                <div class="card">
                                <img src="${info.imagen}" class="card-img-top img-card-capitulos" alt="${info.titulo}">
                                <div class="card-body">
                                    <h3 class="numEpisodio rounded-pill mt-2">Episodio ${info.episodios}</h3>
                                    <h5 class="card-title">${info.titulo}</h5>
                                </div>
                                </div>
                            </div>`
    
            capitulos.innerHTML += template
        }
    })
})

const favoritosPadre = document.getElementById("favoritos")

if(localStorage.getItem("favoritos")){
    let datosGuardados = JSON.parse(localStorage.getItem("favoritos"))

    datosGuardados.forEach((fav) => {
        const template = `  <div class="col mb-4">
                                <a href="infoanime.html?id=${fav.id}">
                                    <div class="card card-animation">
                                        <img src="${fav.imagen}" class="card-img-top" alt="${fav.nombre}">
                                        <div class="card-body">
                                            <h5 class="card-title">${fav.nombre}</h5>
                                        </div>
                                        
                                    </div>
                                </a>
                                <button class="borrar" id="${fav.id}">x</button>
                                
                            </div>
                        `
        favoritosPadre.innerHTML += template
       
        
        document.querySelectorAll(".borrar").forEach((el) => {
            el.addEventListener("click",(e)=>{
                let datosGuardados = JSON.parse(localStorage.getItem("favoritos"))
                const eliminado = datosGuardados.filter((fav) => fav.id != e.target.id)
                localStorage.setItem("favoritos",JSON.stringify(eliminado))
                location.reload();
            })
        })

    })
}
else{
    
    document.querySelector("h1").innerHTML = "No tienes animes favoritos"

}

const imagen = document.getElementById("imagenGrande")
const informacionAnime = document.getElementById("informacionAnime")

let urlA = window.location.href
let idA = urlA.split("=")[1]

urlID = `https://api.jikan.moe/v4/anime/${idA}`

fetch(urlID).then(resp => resp.json()).then(datos =>{

    const template = `<h1>${datos.data.title}</h1>
                        <p>${datos.data.synopsis}</p>
                        <div class="favorito">
                            <span>Agregar a favoritos &nbsp;&nbsp; </span>
                            <i class="fa-solid fa-heart fav"></i>
                        </div>`

    informacionAnime.innerHTML = template


    const templateImg = `<img src="${datos.data.images.jpg.large_image_url}" alt="">`
    imagen.innerHTML = templateImg

    const fav = document.querySelector(".favorito")

    fav.addEventListener("click",() => {
        const datos = {
            nombre: document.querySelector("h1").innerHTML,
            imagen: document.querySelector("img").src,
            id: idA
        }

        if(localStorage.getItem("favoritos")){
            let datosGuardados = JSON.parse(localStorage.getItem("favoritos"))
            datosGuardados = datosGuardados.filter((el) => el.nombre != datos.nombre)
            datosGuardados.push(datos)
            localStorage.setItem("favoritos",JSON.stringify(datosGuardados))
            window.location.href = `favoritos.html`;
        }
        else{
            const favoritos = []
            favoritos.push(datos)
            localStorage.setItem("favoritos",JSON.stringify(favoritos))
            window.location.href = `favoritos.html`;
        }
    })
})

let urlA2 = window.location.href
let idA2 = urlA2.split("=")[1]
const busqueda = document.getElementById("busqueda")

const urlBusqueda = `https://api.jikan.moe/v4/anime?q=${idA2}&order_by=popularity`

fetch(urlBusqueda).then(resp => resp.json()).then(datos => {
   /*  console.log(datos.data[0].images); */
    const resultados = datos.data

    resultados.forEach((resultado) => {
        const info = {
            imagen: resultado.images.jpg.image_url,
            titulo: resultado.title,
            id: resultado.mal_id
        }
    
        const template = `
                            <div class="col mb-4">
                                <a href="infoanime.html?id=${info.id}">
                                    <div class="card card-animation">
                                    <img src="${info.imagen}" class="card-img-top" alt="${info.titulo}">
                                    <div class="card-body">
                                        <h5 class="card-title">${info.titulo}</h5>
                                    </div>
                                    </div>
                                </a>
                            </div>
                        `
        
        busqueda.innerHTML += template
    })

    
})

const urlProximamente = "https://api.jikan.moe/v4/top/anime?filter=upcoming"
const listaProximamente = document.getElementById("animesProximos")

fetch(urlProximamente).then(resp => resp.json()).then(datos =>{
    /* console.log(datos.data.slice(0,5)); */
    const animesTop = datos.data.slice(0,8)

    animesTop.forEach((anime) => {
        const info = {
            titulo: anime.title,
            imagen: anime.images.jpg.small_image_url,
        }

        const template = `<a href="#" class="list-group-item list-group-item-action d-flex">
                            <div class="d-flex align-items-center">
                                <img src="${info.imagen}"  alt="">
                            </div>
                            <div class="pl-3">
                                <p class="text-success mb-2">${info.titulo}</p>
                            </div>
                        </a>`
        listaProximamente.innerHTML += template
        /* console.log(info); */
    })

})

const urlTopEmision = "https://api.jikan.moe/v4/top/anime?filter=airing"
const listaTop = document.getElementById("animesTopE")

fetch(urlTopEmision).then(resp => resp.json()).then(datos =>{
   /*  console.log(datos.data.slice(0,5)); */
    const animesTop = datos.data.slice(0,8)

    animesTop.forEach((anime) => {

        const info = {
            titulo: anime.title,
            imagen: anime.images.jpg.small_image_url,
            score: anime.score,
            id: anime.mal_id
        }

        const template = `<a href="infoanime.html?id=${info.id}" class="list-group-item list-group-item-action d-flex">
                            <div class="d-flex align-items-center">
                                <img src="${info.imagen}"  alt="">
                            </div>
                            <div class="pl-3">
                                <p class="text-success mb-2">${info.titulo}</p>
                                <p class="m-0">Score: ${info.score}</p>
                            </div>
                        </a>`
        listaTop.innerHTML += template
       /*  console.log(info); */
    })

})

const urlUltimos = "https://api.jikan.moe/v4/seasons/now"
const ultimos = document.getElementById("ultimosAnimes")


fetch(urlUltimos).then(resp => resp.json()).then(datos => {
   /*  console.log(datos.data[0]); */
    const ultimosA = datos.data

    ultimosA.forEach((anime,index) =>{
        if(index < 20){
           
            const info = {
                imagen: anime.images.jpg.image_url,
                titulo: anime.title,
                id: anime.mal_id
            }
    
            const template = `
                                <div class="col mb-4">
                                    <a href="infoanime.html?id=${info.id}">
                                        <div class="card card-animation">
                                        <img src="${info.imagen}" class="card-img-top" alt="${info.titulo}">
                                        <div class="card-body">
                                            <h5 class="card-title">${info.titulo}</h5>
                                        </div>
                                        </div>
                                    </a>
                                </div>
                            `
            
            ultimos.innerHTML += template
        }
    })
})
