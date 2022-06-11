const formulario = document.querySelector("form");
console.log(window.location.href);
formulario.addEventListener("submit",(e)=>{

    e.preventDefault();
    const busqueda = document.querySelector("input").value;
    console.log(window.location.href.split("/").includes("templates"));
    if(window.location.href.split("/").includes("templates")){
        window.location.href = `busqueda.html?value=${busqueda}`;
        console.log(1);
        console.log(`busqueda.html?value=${busqueda}`);
    }
    else{
        window.location.href = `templates/busqueda.html?value=${busqueda}`;
        console.log(2);
        console.log(`templates/busqueda.html?value=${busqueda}`);
    }

})