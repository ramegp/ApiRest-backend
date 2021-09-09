import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
    marginTop: "10px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    marginBottom: "10px",
  },
}));

const sendProducto = () => {
    if((document.getElementById("title-prod").value !== '')&&(document.getElementById("description-prod").value !== '')&&(document.getElementById("stock-prod").value !== '')&&(document.getElementById("codigo-prod").value !== '')&&(document.getElementById("price-prod").value !== '')&&(document.getElementById("thumbnail-prod").value !== '')){
        let obj = {
            "title": document.getElementById("title-prod").value,
            "description": document.getElementById("description-prod").value,
            "stock": document.getElementById("stock-prod").value,
            "timestamp": new Date(),
            "codigo": document.getElementById("codigo-prod").value,
            "price": document.getElementById("price-prod").value,
            "thumbnail": document.getElementById("thumbnail-prod").value
        }
        //envio el prod
        axios({
            method: "post",
            url: `http://localhost:8080/products/agregar`,
            data: obj,
          }).then((response) => {
            console.log(response);
          });
          window.location.reload()
    }else{
        alert('Faltan completar campos')
    }
};

function AgregarProductos() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <form className={classes.root}>
          <label htmlFor="">Title</label>
          <input
            type="text"
            id="title-prod"
            className={classes.input}
            required
          />
          <label htmlFor="">Descripcion</label>
          <input
            type="text"
            id="description-prod"
            className={classes.input}
            required
          />
          <label htmlFor="">Precio</label>
          <input
            type="number"
            id="price-prod"
            min="0"
            className={classes.input}
            required
          />
          <label htmlFor="">Stock</label>
          <input
            type="number"
            id="stock-prod"
            min="0"
            className={classes.input}
            required
          />
          <label htmlFor="">Codigo</label>
          <input
            type="text"
            id="codigo-prod"
            className={classes.input}
            required
          />
          <label htmlFor="">Url Imagen</label>
          <input
            type="text"
            id="thumbnail-prod"
            className={classes.input}
            required
          />

          <button
          type="submit"
            onClick={(e) => {
                e.preventDefault()
                sendProducto();
            }}
          >
            Cargar Producto
          </button>
        </form>
      
    </div>
  );
}

export default AgregarProductos;
