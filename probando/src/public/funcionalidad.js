function deleteProd(id) {
    fetch(`http://localhost:8080/api/productos/borrar/${id}`, {
        method: 'DELETE'
    });
    location.reload(true)
}

function updateProd(id) {
    window.location.href = `http://localhost:8080/api/productos/actualizar/${id}`
}