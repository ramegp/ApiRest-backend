import { Producto } from "./Interfaces";

export class Cart {
    private id_cart: number;
    private user: string;
    private products_cart: any = []
    private root: boolean = false;
    private buy: boolean = false;

    constructor(id: number, user: string) {
        this.user = user
        this.id_cart = id;
    }
    getId = () => {
        return this.id_cart
    }
    getUser = () => {
        return this.user
    }
    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        return this.products_cart.length
    }

    addProductToCart = (prod: Producto) => {
        let prod_add_to_cart = { ...prod, id: this.obtenerCantidadProductos() + 1 }
        this.products_cart.push(prod_add_to_cart);
        return prod_add_to_cart
    }

    products = () => {
        return this.products_cart
    }

    searchProductId = (num: number) => {
        //obtengo los productos
        if (!this.products_cart) {
            //No hay productos devuelvo msj no hay
            return undefined
        } else {
            return this.products_cart.find((e: any) => e.id == num)
        }
    }

    deletedProduct = (id_produc: number) => {
        let existe = this.searchProductId(id_produc)
        if (existe) {
            let index_deleted: number;

            for (let index = 0; index < this.products_cart.length; index++) {
                if (this.products_cart[index].id === id_produc) {
                    index_deleted = index
                }
            }
            // @ts-ignore
            this.products_cart.splice(index_deleted, 1)
            return existe
        } else {
            return 'error, no existe el id'
        }
    }
    isRoot = () => {
        return this.root
    }
    buyOrder = () => {
        //me dice si finalizo la compra o no
        return this.buy
    }
    finishBuy = () => {
        //Marcamos que el usuario termino la compra con ese carrito
        this.buy = true
    }
}

export class HandleCarts {
    private carts: Array<Cart> = [];
    constructor() {

    }
    private obtenerCantidadCarts = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        return this.carts.length
    }
    getCarts = () => {
        return this.carts
    }
    createCart = (user: string) => {
        this.addCart(new Cart(this.obtenerCantidadCarts() + 1, user))
    }
    addCart = (cart: Cart) => {
        this.carts.push(cart)
    }
    addProductToCart = (user: string, prod: any) => {
        if (this.searchCartByUser(user)) {
            return this.searchCartByUser(user)?.addProductToCart(prod)
        }
    }

    deleteProductToCart = (user: string, id_prod: number) => {
        if (this.searchCartByUser(user)) {
            return this.searchCartByUser(user)?.deletedProduct(id_prod);
        }
    }

    searchCartByUser = (user_search: string) => {

        if (!this.carts) {
            //No hay carritos devuelvo undefined
            return undefined
        } else {
            //si tengo carritos busco el usuario y que no haya finalizado la compra
            return this.carts.find((e: Cart) => (e.getUser() == user_search) && (!e.buyOrder()))
        }
    }

    finishBuyUser = (user: string) => {
        if (!this.searchCartByUser(user)) {
            this.searchCartByUser(user)?.finishBuy()
        }
    }

    showUserCart = (user: string) => {
        if (!this.searchCartByUser(user)) {
            return this.searchCartByUser(user)
        } else {
            return undefined
        }
    }

}