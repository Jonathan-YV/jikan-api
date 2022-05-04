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
