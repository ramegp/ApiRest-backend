"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cart {
    constructor(id, user) {
        this.products_cart = [];
        this.root = false;
        this.buy = false;
        this.getId = () => {
            return this.id_cart;
        };
        this.getUser = () => {
            return this.user;
        };
        this.obtenerCantidadProductos = () => {
            //Obtiene la cantidad de productos del archivo para generar el id automatico
            return this.products_cart.length;
        };
        this.addProductToCart = (prod) => {
            let prod_add_to_cart = { ...prod, id: this.obtenerCantidadProductos() + 1 };
            this.products_cart.push(prod_add_to_cart);
            return prod_add_to_cart;
        };
        this.products = () => {
            return this.products_cart;
        };
        this.searchProductId = (num) => {
            //obtengo los productos
            if (!this.products_cart) {
                //No hay productos devuelvo msj no hay
                return undefined;
            }
            else {
                return this.products_cart.find((e) => e.id == num);
            }
        };
        this.deletedProduct = (id_produc) => {
            let existe = this.searchProductId(id_produc);
            if (existe) {
                let index_deleted;
                for (let index = 0; index < this.products_cart.length; index++) {
                    if (this.products_cart[index].id === id_produc) {
                        index_deleted = index;
                    }
                }
                // @ts-ignore
                this.products_cart.splice(index_deleted, 1);
                return existe;
            }
            else {
                return 'error, no existe el id';
            }
        };
        this.isRoot = () => {
            return this.root;
        };
        this.buyOrder = () => {
            //me dice si finalizo la compra o no
            return this.buy;
        };
        this.finishBuy = () => {
            //Marcamos que el usuario termino la compra con ese carrito
            this.buy = true;
        };
        this.user = user;
        this.id_cart = id;
    }
}
exports.Cart = Cart;
class HandleCarts {
    constructor() {
        this.carts = [];
        this.obtenerCantidadCarts = () => {
            //Obtiene la cantidad de productos del archivo para generar el id automatico
            return this.carts.length;
        };
        this.getCarts = () => {
            return this.carts;
        };
        this.createCart = (user) => {
            this.addCart(new Cart(this.obtenerCantidadCarts() + 1, user));
        };
        this.addCart = (cart) => {
            this.carts.push(cart);
        };
        this.addProductToCart = (user, prod) => {
            if (this.searchCartByUser(user)) {
                return this.searchCartByUser(user)?.addProductToCart(prod);
            }
        };
        this.deleteProductToCart = (user, id_prod) => {
            if (this.searchCartByUser(user)) {
                return this.searchCartByUser(user)?.deletedProduct(id_prod);
            }
        };
        this.searchCartByUser = (user_search) => {
            if (!this.carts) {
                //No hay carritos devuelvo undefined
                return undefined;
            }
            else {
                //si tengo carritos busco el usuario y que no haya finalizado la compra
                return this.carts.find((e) => (e.getUser() == user_search) && (!e.buyOrder()));
            }
        };
        this.finishBuyUser = (user) => {
            if (!this.searchCartByUser(user)) {
                this.searchCartByUser(user)?.finishBuy();
            }
        };
        this.showUserCart = (user) => {
            if (!this.searchCartByUser(user)) {
                return this.searchCartByUser(user);
            }
            else {
                return undefined;
            }
        };
    }
}
exports.HandleCarts = HandleCarts;
//# sourceMappingURL=HandleCarts.js.map