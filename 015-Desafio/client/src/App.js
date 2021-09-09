
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import MostrarProductos from './pages/MostarProductos/MostrarProductos';
import AgregarProductos from './pages/AgregarProductos/AgregarProductos';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

import { initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage } from './Socket';
import { useEffect, useState } from 'react';

import io from 'socket.io-client'
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:"white"
  },
  link:{
    color:"black",
    textDecoration:"none"
  }
}));
const socket = io('http://localhost:8080')
//const socket = io.connect("http://localhost:8080", { forceNew: true })
function App() {
  const [user, setuser] = useState('')

  useEffect(() => {
    
    socket.on('msj-server',(data)=>{console.log(data);})
    socket.emit('react-msj',"holaa probando")
  }, [])
  const classes = useStyles();
  return (
    <div className="App">
      <Router>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/products"className={classes.link}> Mostrar productos </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/agregar" className={classes.link}> Agregar productos </Link>
            </Typography>
            
            {user !== ''?(
              <Typography variant="h6" className={classes.title}>
              <Link to="/cart" className={classes.link}> Carrito </Link>
            </Typography>
            ):(
              <Typography variant="h6" className={classes.title}>
              <Link to="/login" className={classes.link}> Login </Link>
            </Typography>
            )}
          </Toolbar>
        </AppBar>




        <Switch>
          <Route exact path="/products/:idProd?"> <MostrarProductos user={user} /> </Route>

          <Route exact path="/agregar" component={AgregarProductos} />
          
          <Route exact path="/cart"> <Cart socket={socket} user={user} setuser={setuser}/> </Route>
          <Route exact path="/login"> <Login socket={socket} user={user} setuser={setuser}/> </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
