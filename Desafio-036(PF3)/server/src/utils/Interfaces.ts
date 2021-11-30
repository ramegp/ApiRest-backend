export interface Producto {
    title: string,
    description: string,
    stock: number,
    timestamp: string,
    codigo: string,
    price: number,
    thumbnail: string,
}

export interface MsjChat {
    user: string,
    msj: string,
    date: string
}

export interface Author {
    id: string,
    nombre: string,
    apellido: string,
    alias: string,
    edad: number
}

export interface UsuarioPassport {
    user: string,
    pass: string,
    name:String,
    address:String,
    age:String,
    phone:String,
    avatar:String
}

export interface UsuarioPassportMongo {
    _id:string;
    user: string,
    pass: string
}