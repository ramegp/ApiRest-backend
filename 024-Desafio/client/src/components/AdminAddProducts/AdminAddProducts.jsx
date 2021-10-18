import axios from 'axios'
import React, { useState } from 'react'
import './admin.css'
function AdminAddProducts() {
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [stock, setstcok] = useState('')
    const [codigo, setcodigo] = useState('')
    const [img, setimg] = useState('');
    const limpiarDatos = () => {
        settitle('');
        setdesc('');
        setprice('');
        setstcok('');
        setcodigo('');
        setimg('');
        document.getElementById('title').value = "";
        document.getElementById('desc').value = "";
        document.getElementById('price').value = "";
        document.getElementById('stock').value = "";
        document.getElementById('codigo').value = "";
        document.getElementById('img').value = "";

    }
    const handleEnviarDatos = (e) => {
        e.preventDefault()
        if (title && desc && price && stock && codigo && img) {
            let obj = 
                {
                    "title": title,
                    "description": desc,
                    "stock": stock,
                    "timestamp": "2021-09-09T22:26:41.443Z",
                    "codigo": codigo,
                    "price": price,
                    "thumbnail": img
                }
            
            console.log(obj);
            axios({
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
                mode: "cors",
                url: "http://localhost:8080/products",
                data:obj
              }).then((data) => {
                console.log(data);
              });

            limpiarDatos()
        } else {
            alert("falta completar datos")
        }
    }
    return (
        <div>
            <form className="container-form">
                <label htmlFor="">Title</label>
                <input type="text" name="" id="title" onChange={(e)=>{settitle(e.target.value)}}/>

                <label htmlFor="">Description</label>
                <input type="text" name="" id="desc" onChange={(e)=>{setdesc(e.target.value)}}/>

                <label htmlFor="">Precio</label>
                <input type="number" name="" id="price" onChange={(e)=>{setprice(e.target.value)}}/>

                <label htmlFor="">Stock</label>
                <input type="number" name="" id="stock" onChange={(e)=>{setstcok(e.target.value)}}/>

                <label htmlFor="">Codigo</label>
                <input type="text" name="" id="codigo" onChange={(e)=>{setcodigo(e.target.value)}}/>

                <label htmlFor="">Imagen</label>
                <input type="text" name="" id="img" onChange={(e)=>{setimg(e.target.value)}}/>

                <button onClick={(e)=>{handleEnviarDatos(e)}}>Enviar</button>
            </form>
        </div>
    )
}

export default AdminAddProducts
