export class DBCart {

    cart_connect = require('../database/db-cart').connect;
    cart_disconnect = require('../database/db-cart').disconnect;

    constructor () {}

    findAllCartUser = async (email:String) => {
        let db = this.cart_connect();
        let user_cart_search = await db?.CarritoModel.find({titular: email});
        this.cart_disconnect()
        return user_cart_search 
    }

    findCartUser = async (email:String) => {
        let db = this.cart_connect();
        let user_cart_search = await db?.CarritoModel.find({titular: email});
        if (user_cart_search.length == 0) {
            let cart = {
                titular: email,
                productos:[],
                finalizo : false
            }
            let user_cart_created= await db?.CarritoModel.create(cart);
            this.cart_disconnect()
            return user_cart_created
            
        }else{
            let todos_finalizados = true;
            for (const cart of user_cart_search) {
                if ( !cart.finalizo ){
                    todos_finalizados = false;
                    this.cart_disconnect()
                    return cart
                }
            }
            if(todos_finalizados){
                let cart = {
                    titular: email,
                    productos:[],
                    finalizo : false
                }
                let user_cart_created= await db?.CarritoModel.create(cart);
                this.cart_disconnect()
                return user_cart_created
            }
        }
        this.cart_disconnect();
        return user_cart_search
    }

    finalizoCartUser = async (email:String) => {
        let db = this.cart_connect();
        let user_cart_search = await db?.CarritoModel.updateOne({ titular: email }, {
            $set: {
                finalizo : true
            }})
        let user_cart = await db?.CarritoModel.find({titular: email});
        this.cart_disconnect()
        return user_cart
    }

    addProdCartUser = async (email:String,prod_to_add:any) => {
        let db = this.cart_connect();
        let user_cart_search = await db?.CarritoModel.updateOne({$and:[{titular:email},{finalizo:false}]},{$push:{productos : prod_to_add}})
        this.cart_disconnect()
        return user_cart_search
    }

    buscando = async (email:String,prod_to_add:any) => {
        let db = this.cart_connect();
        
        let user_cart_search = await db?.CarritoModel.updateOne({$and:[{titular:email},{finalizo:false},{productos: {$elemMatch :{title:prod_to_add.title}}}]},{$set:{$inc:{productos:{cantidad: prod_to_add.cantidad}}}})
        this.cart_disconnect()
        return user_cart_search
    }
    /* addProdCartUser = () => {
        let db = this.cart_connect();
        
        let user_created = await db?.UserSessionModel.create(prod)
            console.log("Usuario creado");
            this.users_disconnect()
            return user_created

        }

        console.log('Usuario Existe');
        
        this.users_disconnect()
        return {}
    } */
}