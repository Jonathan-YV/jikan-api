
const formulario = document.querySelector("form")
/* console.log(formulario); */

formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("Hola");
    const busqueda = document.querySelector("input").value

    window.location.href = `busqueda.html?value=${busqueda}`;
})