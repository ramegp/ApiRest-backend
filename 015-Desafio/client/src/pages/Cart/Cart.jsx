import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";

function Cart(props) {
  const { idProdCart } = useParams();
  const [cart, setcart] = useState([]);
  const [change, setchange] = useState(false)

  function cargarCarrito() {
    axios({
      method: "get",
      url: `http://localhost:8080/cart/listar/${idProdCart}`,
      data: { user: props.user },
    }).then((response) => {
      setcart(response.data.product);
    });
  }
  const handleDelete = (id) => {
    axios({
      method: "post",
      url: `http://localhost:8080/cart/borrar/${id}`,
      data: { user: props.user },
    }).then((response) => {
      setcart(response.data.product);
    });
    setchange(true)
    
  }
  useEffect(() => {
    //console.log(props.user)
    axios({
        method: "post",
        url: `http://localhost:8080/cart/listar/${idProdCart}`,
        data: { user: props.user },
      }).then((response) => {
        setcart(response.data.product);
      });
    setchange(false)
  }, [change]);

  return (
    <div>
      
      {cart ? (
        cart.map((prod, index) => {
          return (
            <Card prod={prod} delete={handleDelete}/>
          );
        })
      ) : (
        <p>no hay</p>
      )}
    </div>
  );
}

export default Cart;
