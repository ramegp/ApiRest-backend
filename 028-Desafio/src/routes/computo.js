const cantidad = 10;

var numero_random =(min,max) => Math.floor(Math.random() * ((max+1) - min) + min);
const devolver = [];

const calculo = () => {
    for (let i = 0; i < 10; i++) {
        devolver.push({
            numero: i,
            cantidad: 0
        })
    }

    return devolver
}

const cargar = (arreglo) => {

    for (let i = 0; i < cantidad; i++) {
        arreglo[numero_random(0,9)].cantidad++
    }

    return arreglo
}

process.on('message', msg => {
    const devolver = cargar(calculo())
    process.send(devolver)
})
