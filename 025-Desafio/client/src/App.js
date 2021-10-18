import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu/Menu';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import Products from './pages/Products/Products';
import axios from 'axios';

function App() {
  const [user_name, setuser_name] = useState(null)
  const [admin, setadmin] = useState(false)
  const [products, setproducts] = useState(null)
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
        setuser_name(data.data.user);
        setadmin(data.data.admin);
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
        setproducts(data.data)
      });
  }, [])
  return (
    <Router>

      <div>
        <Menu seters={{user:setuser_name,admin:setadmin,products:setproducts}} geters={{user:user_name,admin:admin}}/>
        <Switch>
          
          <Route path="/login">
            <Login seters={{user:setuser_name,admin:setadmin}} geters={{user:user_name,admin:admin}}></Login>
          </Route>

          <Route path="/products">
            <Products seters={{user:setuser_name,admin:setadmin}} geters={{user:user_name,admin:admin}}></Products>
          </Route>

          <Route path="/">
            <Home seters={{user:setuser_name,admin:setadmin,products:setproducts}} geters={{user:user_name,admin:admin,products:products}}></Home>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
