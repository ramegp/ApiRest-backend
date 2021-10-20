import express = require("express");

import passport = require('passport');
import bCrypt = require('bcrypt');
import { Strategy as LocalStrategy } from "passport-local";

const router = express.Router();

import { auth } from '../middleware/log';
import { DBMongo } from "../utils/DBMongo";
import { UsuarioPassport, UsuarioPassportMongo } from "../utils/Interfaces";


passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    const db = new DBMongo();
    db.findUserByEmail(username).then((user:UsuarioPassportMongo)=>{
        if (!user) {
            console.log('User Not Found with username '+username);
            console.log('message', 'User Not found.');                 
            return done(null, false)
        } else {
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)){
                console.log('Invalid Password');
                console.log('message', 'Invalid Password');
                return done(null, false) 
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
            }
    })
    
  })
);

var isValidPassword = function(user:UsuarioPassport, password:string){
  return bCrypt.compareSync(password, user.pass);
}

passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
      
      const findOrCreateUser = function(){
          // find a user in Mongo with provided username
          const db = new DBMongo();
         
          db.findUserByEmail(username).then((user:UsuarioPassportMongo)=>{
              console.log(username);
              console.log((user));
              
              //@ts-ignore
              if (user.length != 0) {
                  console.log('User already exists');
                  console.log('message','User Already Exists');
                  return done(null, false)
              } else {
                  
                  let newUser = {
                      user:username,
                      pass: createHash(password)
                  }
                  const baseDatos = new DBMongo();
                  baseDatos.addSessionPassport(newUser).then((user:any)=>{
                      console.log('User Registration succesful');    
                      return done(null, newUser);
                  })
              }
          })


          
    }
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
)
  // Generates hash using bCrypt
var createHash = function(password:string){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}
passport.serializeUser((user:any, done) => {
    done(null, user._id);
});
   
  passport.deserializeUser(function(id:string, done) {
      const db = new DBMongo();
      db.findUserById(id).then((user:any)=>{done(null,user)})
   
  });

//---------------------------------------------------------//
router.get('/',(req: express.Request, res: express.Response)=>{
    if(req.isAuthenticated()){
        res.send("autenticado")
    }
    else {
        res.send("no autenticado")
    }
})

router.post('/in', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req: express.Request, res: express.Response) => {
    res.redirect('/datos')        
})

router.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

//Register sing up
router.get('/up', (req: express.Request, res: express.Response) => {
    res.send('singup')
})

router.post('/up', passport.authenticate('register', { failureRedirect: '/failregister' }), (req: express.Request, res: express.Response) => {
    res.redirect('/') 
})

router.get('/failregister', (req: express.Request, res: express.Response) => {
    res.render('register-error', {});
})

//SingOut

router.get('/out',(req: express.Request, res: express.Response) => {
    req.logout()
    res.render("logout")
})



module.exports = router