import { TextField } from "@material-ui/core";
import React from "react";

function FormActualizar(props) {

    const handleOnChangeTitle = (e)=>{props.seters.title(e.target.value)}
    const handleOnChangePrice = (e)=>{props.seters.price(e.target.value)}
    const handleOnChangeDescription = (e)=>{props.seters.description(e.target.value)}
    const handleOnChangeStock = (e)=>{props.seters.stock(e.target.value)}
    const handleOnChangeCodigo = (e)=>{props.seters.codigo(e.target.value)}
    const handleOnChangeThumbnail = (e)=>{props.seters.thumbnail(e.target.value)}
  return (
    <div>
      <form >
      
        <label htmlFor="">Title</label>
        <input type="text" name="" id="title-update" value={props.prod.title} onChange={handleOnChangeTitle}/>
        <label htmlFor="">Price</label>
        <input type="number" name="" id="price-update" value={props.prod.price} onChange={handleOnChangePrice}/>
        <label htmlFor="">Descripcion</label>
        <input
          type="text"
          name=""
          id="description-update"
          value={props.prod.description}
          onChange={handleOnChangeDescription}
        />
        <label htmlFor="">Stock</label>
        <input type="number" name="" id="stock-update" value={props.prod.stock} onChange={handleOnChangeStock}/>
        <label htmlFor="">Codigo</label>
        <input type="text" name="" id="codigo-update" value={props.prod.codigo} onChange={handleOnChangeCodigo}/>
        <label htmlFor="">Url imagen</label>
        <input
          type="text"
          name=""
          id="thumbnail-update"
          value={props.prod.thumbnail}
          onChange={handleOnChangeThumbnail}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.actualizar();
            props.finalizoActualizacion(false);
          }}
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default FormActualizar;
