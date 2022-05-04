const favoritosPadre = document.getElementById("favoritos")

if(JSON.parse(localStorage.getItem("favoritos")).length != 0){
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