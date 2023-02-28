import { mostrarEstudantes } from "./crud.js";

window.addEventListener("load", async () => {
    await mostrarEstudantes();
});