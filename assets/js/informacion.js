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