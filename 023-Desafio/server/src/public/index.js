document.addEventListener('DOMContentLoaded', function() {
    let btn_sass = document.getElementById("btn-sass")
    let btn_comp = document.getElementById("btn-components")
    let div_sass = document.getElementById("div-form-carga")

    btn_sass.addEventListener('click',(e)=>{
        e.preventDefault()
        div_sass.classList.toggle('probando1quitar')
    })
    btn_comp.addEventListener('click',(e)=>{
        e.preventDefault()
        alert("com")
    })
});