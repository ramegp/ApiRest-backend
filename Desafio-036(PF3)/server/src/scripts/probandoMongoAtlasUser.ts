import { DBMongo } from "../utils/DBMongo";

const db = new DBMongo()

db.findUserByEmail('ramgp').then((data:any)=>{
    if (data.length != 0) {
        console.log("hay")
    } else {
        console.log("no ahy");
        
    }
})


/* if ([]) {
    console.log("true");
    
} else {
    console.log("false");
    
} */