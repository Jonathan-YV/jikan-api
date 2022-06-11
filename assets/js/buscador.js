const formulario = document.querySelector("form");

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();
    const busqueda = document.querySelector("input").value;

    if(window.location.href.split("/").includes("templates")){
        window.location.href = `busqueda.html?value=${busqueda}`;
    }
    else{
        window.location.href = `templates/busqueda.html?value=${busqueda}`;
    }
})