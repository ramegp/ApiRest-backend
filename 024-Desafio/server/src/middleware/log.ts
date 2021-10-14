import express = require("express");

export const auth = (req: express.Request, res: express.Response,next:any)=>{
    
    console.log(`${req.session.user} == ${process.env.useradmin}`);
    
    
    if (req.session && (req.session.user == process.env.useradmin) && req.session.admin) {
        return next()
    } else {
        res.sendStatus(401)
    }
    
}
