import { actualizarEstudiante, ocultarVentanaModificacion } from "./crud.js";

const botonModificar = document.getElementById("contenedor_modificar__botones__modificar");
const botonCancelar = document.getElementById("contenedor_modificar__botones__cancelar");

// const ocultarVentanaModificacion = () => {
//     // Obtener ventana y formulario de modificación.
//     const ventana = document.getElementById("ventana");
//     const contenedor_modificar = document.getElementById("contenedor_modificar");

//     // CSS para ocultarlo.
//     ventana.style.display = "none";
//     contenedor_modificar.style.display = "none";    
// };

botonCancelar.addEventListener("click", ocultarVentanaModificacion);

botonModificar.addEventListener("click", async() => {
    await actualizarEstudiante();
});