import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ShowProducts(props) {

    


    useEffect(() => {
        axios({
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
            url: "http://localhost:8080/products",
          }).then((data) => {
            props.seters.products(data.data)
          });
    }, [])
    return (
        <div>
            {props.geters.products?.map((p,i)=>{return(
                <p>{p.title}</p>
            )})}
        </div>
    )
}

export default ShowProducts
