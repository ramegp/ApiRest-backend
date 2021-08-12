import * as express from "express";
import * as fs from "fs";
​
const app = express();
const puerto = 8080;
const path = "./assets";


const server = app.listen(puerto, () => {
  console.log(`servidor inicializado en el puerto ${puerto}`);
});
const crearArchivo = (nombreArchivo: string) => {
  const visitas = [
    {
      items: 0,
      item: 0,
    },
  ];
  // if (!fs.existsSync(nombreArchivo)) { //esto seria si quiero guardar el contenido
  //   fs.writeFileSync(
  //   path + "/" + nombreArchivo,
  //   JSON.stringify(visitas, null, "\t")
  // );
  // }
  fs.writeFileSync(
    path + "/" + nombreArchivo,
    JSON.stringify(visitas, null, "\t")
  );
  //esto es para pisarlo cada vez que inicio el server
};
crearArchivo("visitas.txt");
app.get("/", (req: express.Request, res: express.Response) => {
  return res.json({ msg: "Home" });
});
​
app.get("/items", (req: express.Request, res: express.Response) => {
  const visitas = JSON.parse(fs.readFileSync(path + "/visitas.txt", "utf-8"));
  visitas[0].items++;
  fs.writeFileSync(path + "/visitas.txt", JSON.stringify(visitas, null, "\t"));
​
  fs.promises
    .readFile(path + "/productos.txt")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      res.json({
        items: JSON.parse(datos),
        cantidad: JSON.parse(datos).length,
      });
    });
});
​
app.get("/item-random", (req: express.Request, res: express.Response) => {
  let random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };
​
  const visitas = JSON.parse(fs.readFileSync(path + "/visitas.txt", "utf-8"));
  visitas[0].item++;
  fs.writeFileSync(path + "/visitas.txt", JSON.stringify(visitas, null, "\t"));
​
  fs.promises
    .readFile(path + "/productos.txt")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      return res.json({
        item: JSON.parse(datos)[random(0, JSON.parse(datos).length)],
      });
    });
});
​
app.get("/visitas", (req: express.Request, res: express.Response) => {
  fs.promises
    .readFile(path + "/visitas.txt")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      return res.json({ visitas: JSON.parse(datos)[0] });
    });
});