import axios from 'axios';
import React from 'react'

function Login(props) {

    function changeUser(name) {

        window.fetch('http://localhost:8080/cart',{
            method:"post",
            body:JSON.stringify({ "user": name }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>console.log(res))
        /* axios({
            method: "get",
            url: `http://localhost:8080/cart`,
            data: { "user": props.user },
          }).then((response) => {
            console.log(response);
          }); */
      }

    return (
        <div>
            {props.user === "" ? (
        <div>
          <label htmlFor="">Nombre Usuario</label>
          <input id="user" type="text" placeholder="user..." />
          <button
            onClick={() => {
              props.setuser(document.getElementById("user").value);
                changeUser(document.getElementById("user").value)
            }}
          >
            Enviar
          </button>
        </div>
      ) : (
        <p>Usuario registrado a nombre de {props.user}</p>
      )}
        </div>
    )
}

export default Login
