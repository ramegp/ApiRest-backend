import { Producto } from "./Interfaces"

export abstract class HandlePersistenciaProductos {

    getAllProducts!: () => void
   abstract addProd: (obj: any) => void
   abstract findById: (num: string) => Promise<void>
   abstract upDate: (id_produc: string, new_product: Producto) => Promise<void>
   abstract removeById: (id_produc: string) => void
   abstract  findByName: (name: string) => Promise<void>
   abstract findByCode: (code: string) => Promise<void>
   abstract findByPrice: (price_max: number, price_min?: number) => Promise<void>
   abstract findByStock: (stock_max: number, stock_min?: number) => Promise<void>
   abstract findByPriceStock: (price_max: number, price_min: number, stock_max: number, stock_min: number) => Promise<void>
}


