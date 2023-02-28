// Importar la función 'agregarEstudiante'.
import { agregarEstudiante } from "../js/crud.js";

// Botón que agrega a un estudiante.
const send = document.getElementById("agregarAlumno");

// Agregar la función agregarEtudiante como evento.
send.addEventListener("click", agregarEstudiante);