import express = require("express");

export const auth = (req: express.Request, res: express.Response,next:any)=>{
    //@ts-ignore
    if (req.session && (req.session.user == "ramiro") && req.session.admin) {
        return next()
    } else {
        res.sendStatus(401)
    }
    
}
