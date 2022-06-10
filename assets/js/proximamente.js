const urlProximamente = "https://api.jikan.moe/v4/top/anime?filter=upcoming";
const listaProximamente = document.getElementById("animesProximos");

proximamenteAnimes(urlProximamente, listaProximamente);

async function proximamenteAnimes(url, listaProximamente) {

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const animesTop = datos.data.slice(0,8);

    animesTop.forEach((anime) => {

        const info = {
            titulo: anime.title,
            imagen: anime.images.jpg.small_image_url,
        };

        const template = `
                            <a href="#" class="list-group-item list-group-item-action d-flex">
                                <div class="d-flex align-items-center">
                                    <img src="${info.imagen}"  alt="">
                                </div>
                                <div class="pl-3">
                                    <p class="text-success mb-2">${info.titulo}</p>
                                </div>
                            </a>
                        `;

        listaProximamente.innerHTML += template;

    })
}