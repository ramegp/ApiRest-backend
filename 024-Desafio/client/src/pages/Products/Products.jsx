import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './products.css';
import Productos from '../../components/Productos/Productos';
import axios from 'axios';

function Products(props) {
    const [productos, setproductos] = useState(null)
    useEffect(() => {
        axios({
            method: "get",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                  mode: "cors",
            url: 'http://localhost:8080/log/'
          })
            .then((data)=>{
              props.seters.user(data.data.user);
              props.seters.admin(data.data.admin);
            });
            
        axios({
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
            url: "http://localhost:8080/products",
          }).then((data) => {
            setproductos(data.data)
          });
    }, [])
    return (
        <>
        { props.geters.user ?(<div className="container container-page-products">
        <h1>Page products</h1>
        <table>
            <thead>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Codigo</th>
            </thead>
            <tbody>
                <Productos productos={productos} />
                
            </tbody>
        </table>
    </div>):(<h1>Logeate para poder ver los productos</h1>)}
        </>
        
    )
}

export default Products
