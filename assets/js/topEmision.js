const urlTopEmision = "https://api.jikan.moe/v4/top/anime?filter=airing";
const listaTop = document.getElementById("animesTopE");

topEmision(urlTopEmision, listaTop);

async function topEmision(url, listaTop){

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const animesTop = datos.data.slice(0,8);

    animesTop.forEach((anime) => {

        const info = {
            titulo: anime.title,
            imagen: anime.images.jpg.small_image_url,
            score: anime.score,
            id: anime.mal_id
        };

        const template = `
                            <a href="infoanime.html?id=${info.id}" class="list-group-item list-group-item-action d-flex">
                                <div class="d-flex align-items-center">
                                    <img src="${info.imagen}"  alt="">
                                </div>
                                <div class="pl-3">
                                    <p class="text-success mb-2">${info.titulo}</p>
                                    <p class="m-0">Score: ${info.score}</p>
                                </div>
                            </a>
                        `;

        listaTop.innerHTML += template;

    })
}