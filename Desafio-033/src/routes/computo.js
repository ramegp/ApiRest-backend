let cantidad = 10;

process.on('message', (msg) => {
    cantidad = msg.cantidad
});

var numero_random =(min,max) => Math.floor(Math.random() * ((max+1) - min) + min);
const devolver = [];

const  calculo = async () => {
    for (let i = 0; i < 1000; i++) {
        devolver.push({
            numero: i,
            cantidad: 0
        })
    }

    return devolver
}

const cargar =() => {
    let devolver = [];
    
    for (let i = 0; i < 1000; i++) {
        devolver.push({
            numero: i,
            cantidad: 0
        })
    }
    
    for (let i = 0; i < cantidad; i++) {
        devolver[numero_random(0,devolver.length-1)].cantidad++
    }

    return devolver
}

process.on('message', msg => {
    const devolver = cargar()
    process.send(devolver)
})
