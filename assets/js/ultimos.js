const urlUltimos = "https://api.jikan.moe/v4/seasons/now"
const ultimos = document.getElementById("ultimosAnimes")

ultimosAnimes(urlUltimos, ultimos);

async function ultimosAnimes(url, ultimos){

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const ultimosA = datos.data;

    ultimosA.forEach((anime,index) =>{
        if(index < 20){
           
            const info = {
                imagen: anime.images.jpg.image_url,
                titulo: anime.title,
                id: anime.mal_id
            };
    
            const template = `
                                <div class="col mb-4">
                                    <a href="/templates/infoanime.html?id=${info.id}">
                                        <div class="card card-animation">
                                        <img src="${info.imagen}" class="card-img-top" alt="${info.titulo}">
                                        <div class="card-body">
                                            <h5 class="card-title">${info.titulo}</h5>
                                        </div>
                                        </div>
                                    </a>
                                </div>
                            `;
            
            ultimos.innerHTML += template;

        }
    })
}