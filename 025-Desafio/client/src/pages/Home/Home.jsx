import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import AdminAddProducts from "../../components/AdminAddProducts/AdminAddProducts";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import "./PageHome.css";

function Home(props) {
  const handleClk = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      mode: "cors",
      url: "http://localhost:8080/products",
    }).then((data) => {
      console.log(data);
    });

  };

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
      
  }, [])
  return (
    <div className="container container-Home">
      <h1>Home</h1>
      {props.geters.user && <h2>Bienvenido {props.geters.user}</h2>}


      {props.geters.admin && <AdminAddProducts></AdminAddProducts>}
      {props.geters.user && <ShowProducts seters={{products:props.seters.products}} geters={{products:props.geters.products}}></ShowProducts>}
      
      

    </div>
  );
}

export default Home;
