import axios from "axios";

const obtenerProductos = async () => {
    try {
        let response = await axios.get("http://localhost:8080/products")
        let {data} = response
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
}

obtenerProductos()