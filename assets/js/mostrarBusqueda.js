let urlA = window.location.href
let idA = urlA.split("=")[1]
const busqueda = document.getElementById("busqueda")

const urlBusqueda = `https://api.jikan.moe/v4/anime?q=${idA}&order_by=popularity`

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