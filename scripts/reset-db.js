import fs from "fs";

fs.copyFileSync("carrinhos.template.JSON", "carrinhos.JSON");

console.log("Banco reiniciado");
