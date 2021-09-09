import axios from "axios";
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import FormActualizar from "../../components/FormActualizar/FormActualizar";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card_product: {
    width: "300px",
    background: "gray",
    margin: "7px",
    padding: "5px",
    borderRadius: "10px",
  },
  card_product_title: {},
  card_img: {
    width: "100px",
  },
  boton: {
    width: "100%",
    color: "green",
  },
  form_update: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const handleAdd = (prod, props) => {
  axios({
    method: "post",
    url: `http://localhost:8080/cart/agregar/${prod.id}`,
    data: { user: props.user },
  }).then((response) => console.log(response.data));
};

function MostrarProductos(props) {
  const { idProd } = useParams();
  const [products, setProducts] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [prodActualizar, setprodActualizar] = useState(false);
  const [prod, setProd] = useState(null);
  const [url_input, seturl_input] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [codigo, setCodigo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [id,setId] = useState(null);
  const handleUrl = (e) => {
    seturl_input(e.target.value);
  };

  const cargarProductos = () => {
    axios
      .get(`http://localhost:8080/products/listar/${idProd}`)
      .then((response) => setProducts(response.data.productos));
  };
  const deleteProd = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8080/products/borrar/${id}`,
    }).then((response) => {
      console.log(response);
    });
    cargarProductos();
    window.location.reload();
  };

  const upDateProd = (prod) => {
    setprodActualizar(true);
    setTitle(prod.title);
    setCodigo(prod.codigo);
    setStock(prod.stock);
    setDescription(prod.description)
    setThumbnail(prod.thumbnail);
    setPrice(prod.price)
    setId(prod.id)
    setProd(prod);
  };
  const handleActualizar = () => {
    
    let obj = {
      title: title,
      description: description,
      stock: stock,
      timestamp: new Date(),
      codigo: codigo,
      price: price,
      thumbnail: thumbnail,
    };
    axios({
      method: "put",
      url: `http://localhost:8080/products/actualizar/${id}`,
      data: obj,
    }).then((response) => {
      console.log(response);
    });

  };
  useEffect(() => {
    // GET request using axios inside useEffect React hook

    cargarProductos();

    axios
      .get(`http://localhost:8080/admin/`)
      .then((response) => setAdmin(response.data.isAdmin));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [prodActualizar]);
  const classes = useStyles();

  return (
    <div>
      <h1>Mostrar productos</h1>
      <h4> {admin ? "Hola root" : "No sos root"} </h4>
      {prodActualizar && (
        <FormActualizar
          prod={{
            title,
            price,
            description,
            stock,
            codigo,
            thumbnail
          }}
          seters={{
            title: setTitle,
            price: setPrice,
            description: setDescription,
            stock: setStock,
            codigo: setCodigo,
            thumbnail: setThumbnail,
          }}
          actualizar={handleActualizar}
          finalizoActualizacion={setprodActualizar}
        />
      )}
      <div className={classes.root}>
        {products !== null ? (
          products.map((prod, index) => {
            return (
              <>
                <div className={classes.card_product}>
                  <img
                    src={prod.thumbnail}
                    className={classes.card_img}
                    alt=""
                  />
                  <div className={classes.card_product_title}>{prod.title}</div>
                  <div className={classes.card_product_info}>
                    <div> {prod.description} </div>
                    <div>
                      <span>Precio </span>
                      {prod.price}
                    </div>
                    <div>
                      <span>Stock </span>
                      {prod.stock}
                    </div>
                    <div>
                      <span>Codigo </span>
                      {prod.codigo}
                    </div>
                  </div>
                  <div>
                    {admin ? (
                      <>
                        <Button
                          onClick={() => {
                            deleteProd(prod.id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => {
                            upDateProd(prod);
                          }}
                        >
                          Update
                        </Button>
                        {props.user !== "" ? (
                          <Button
                            className={classes.boton}
                            onClick={() => {
                              handleAdd(prod, props);
                            }}
                          >
                            Add to cart
                          </Button>
                        ) : null}
                      </>
                    ) : (
                      <Button className={classes.boton}>Add to cart</Button>
                    )}
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p> no hay productos </p>
        )}
      </div>
    </div>
  );
}

export default MostrarProductos;
