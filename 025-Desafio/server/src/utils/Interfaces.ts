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