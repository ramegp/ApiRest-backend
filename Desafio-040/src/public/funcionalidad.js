function deleteProd(id) {
    fetch(`http://localhost:8080/api/productos/borrar/${id}`, {
        method: 'DELETE'
    });
    location.reload(true)
}

function updateProd(id) {
    let title = document.getElementById("titleProd").value;
    let price = document.getElementById("priceProd").value;
    let thumbnail = document.getElementById("thumbnailProd").value;

    let ob_to_send = {
        "title":title,
        "price":parseInt(price),
        "thumbnail":thumbnail
    }
    
    fetch(`http://localhost:8080/api/productos/actualizar/${id}`, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(ob_to_send), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
    window.location.href = `http://localhost:8080/api/productos/vista`
}

function pageActualizar(id) {
    window.location.href = `http://localhost:8080/api/productos/actualizar/${id}`
}
