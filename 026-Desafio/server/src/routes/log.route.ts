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
        //console.log(`user ${user}`);
        //console.log(`password ${password}`);
        
        if (!user) {
            console.log('User Not Found with username '+username);
            console.log('message', 'User Not found.');                 
            return done(null, false)
        } else {
            // User exists but wrong password, log the error 
            //user es un arreglo que tiene en la primera posicion el user
            //@ts-ignore
            if (!isValidPassword(user[0], password)){
                console.log('Invalid Password');
                console.log('message', 'Invalid Password');
                return done(null, false) 
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            console.log(`login user ${user}`);
            
            return done(null, user);
            }
    })
    
  })
);

var isValidPassword = function(user:UsuarioPassportMongo, password:string){
    console.log(`user pass ${user.pass}`);
    console.log(`password ${password}`);
    
    
  return bCrypt.compareSync(password, user.pass);
}

passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
      let agregar = false;

      const findOrCreateUser =  function(){
          // find a user in Mongo with provided username
          const db = new DBMongo();
          let newUser = {
            user:username,
            pass: createHash(password)
        }
        db.findUserOrCreate(username,newUser).then((user:UsuarioPassportMongo|any)=>{
            if (Object.keys(user).length == 0) {
                
               return done(null,false)
            } else {
                return done(null,user)
                
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
    //@ts-ignore
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null);
}
passport.serializeUser(function(user:any, done) {
    console.log(`serializer user ${user}`);
    
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