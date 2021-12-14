
const request = require('supertest')('http://localhost:8080')

const expect = require('chai').expect

describe('test api rest full', () => {
    describe('GET', () => {
        it('deberia retornar un status 200', async () => {
            let response = await request.get('/products')
            expect(response.status).to.eql(200)
        })
    })
    /* describe('POST', () => {
        it('deberia incorporar un producto', async () => {
            let producto_agregar = {
                title: "pan dulce",
                description: "Escuadra de color rosa",
                stock: 400,
                codigo: "ES-55",
                price: 45,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
            }

            let response = await request.get('/products')
            let data = response.body
            let cantidad_productos_sin_agregar = data.length

            let response2 = await request.post('/products/').send(producto_agregar)


            let response3 = await request.get('/products')
            let data_nueva = response3.body
            let cantidad_productos_agregado = data_nueva.length

            expect(cantidad_productos_agregado).to.eql(cantidad_productos_sin_agregar+1)
        })
    }) */
    describe('UPDATE', () => {
        it('deberia actualizar un producto',async () => {
            /* 
            id: 61b14c65c4ae912de8bb91b9
            */
           let id_prod_update = "61b14c65c4ae912de8bb91b9"
            let prod_to_update = {
                title: "pan dulce",
                description: "Pan dulce casero",
                stock: 500,
                codigo: "ES-55",
                price: 45,
                timestamp:"2021-12-09T00:23:01.122+00:00",
                thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
            }

            let response = await request.put(`/products/${id_prod_update}`).send(prod_to_update)
            let response2 = await request.get(`/products/${id_prod_update}`)
            //console.log(response2.body[0]);
            

            expect(response2.body[0].description).to.eql(prod_to_update.description)
            expect(response2.body[0].stock).to.eql(prod_to_update.stock)
        })
    })
    


})
