import fs from "fs";

const template = JSON.parse(fs.readFileSync("carrinhos.template.JSON", "utf8"));

const db = JSON.parse(fs.readFileSync("carrinhos.JSON", "utf8"));

db.carros = template.carros;
db.reservas = template.reservas;

fs.writeFileSync("carrinhos.JSON", JSON.stringify(db, null, 2));

console.log("Banco reiniciado");
