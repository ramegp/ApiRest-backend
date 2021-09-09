import { makeStyles } from "@material-ui/core";
import React from "react";

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

function Card(props) {
    const classes = useStyles();
  return (
    <div className={classes.card_product}>
      <img src={props.prod.thumbnail} className={classes.card_img} alt="" />
      <div className={classes.card_product_title}>{props.prod.title}</div>
      <div className={classes.card_product_info}>
        <div> {props.prod.description} </div>
        <div>
          <span>Precio </span>
          {props.prod.price}
        </div>
        <div>
          <span>Stock </span>
          {props.prod.stock}
        </div>
        <div>
          <span>Codigo </span>
          {props.prod.codigo}
        </div>
      </div>
      <button onClick={()=>props.delete(props.prod.id)}>Delete</button>
    </div>
  );
}

export default Card;
