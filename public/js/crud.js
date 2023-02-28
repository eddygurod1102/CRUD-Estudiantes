// Archivo que contiene todas las funciones CRUD 

// -------------------------------------------------------------------------------------------
// Agrega un estudiante a la base de datos.
const agregarEstudiante = async () => {
    // Obtener los datos del formulario
    let nombre = document.getElementById("first");
    let apellido = document.getElementById("last");
    let matricula = document.getElementById("student_id");
    let carrera = document.getElementById("carreer");

    // Vaciar los datos en un objeto.
    const estudiante = {
        name: {
            first: nombre.value,
            last: apellido.value,
        },
        student_id: matricula.value,
        carreer: carrera.value,
    };

    // Registrarlo en la base de datos.
    const respuesta = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(estudiante),
    });

    if (respuesta.ok) {
        alert("Estudiante registrado");
    } else {
        alert("Ha ocurrido un error. Vuelva a intentarlo más tarde");
    }

};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Elimina un estudiante de la base de datos.
const eliminarEstudiante = async (matricula) => {
    // Guardar la matricula en un objeto.
    const eliminar = {
        student_id: matricula,
    };

    // Enviar petición 'DELETE' a la API para eliminar a un estudiante por matrícula.
    const respuesta = await fetch(`http://localhost:8080/students/${matricula}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eliminar),
    });

    if (respuesta.ok) {
        alert("Registro eliminado correctamente;)");

        // Vaciar la tabla.
        reiniciarTabla();

        // Obtener todos los estudiantes registrados.
        await mostrarEstudantes();
    } else {
        alert("Ocurrió un error. Vuelva a intentarlo más tarde.");
    }
};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Actualiza la información de un estudiante de la base de datos.
const actualizarEstudiante = async () => {
    // Obtener campos de texto.
    const first = document.getElementById("first");
    const last = document.getElementById("last");
    const student_id = document.getElementById("student_id");
    const carreer = document.getElementById("carreer");

    // Vaciado de los datos de los campos de texto en un objeto.
    const estudiante = {
        name: {
            first: first.value,
            last: last.value,
        },
        student_id: student_id.value,
        carreer: carreer.value,
    };

    // Enviar petición 'PUT' a la API para actualizar los datos del estudiante.
    const respuesta = await fetch("http://localhost:8080/students", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(estudiante),
    });

    if (respuesta.ok) {
        alert("Registro actualizado con éxito:D");

        // Ocultar la ventana de modificación.
        ocultarVentanaModificacion();

        // Reinicio de la tabla.
        reiniciarTabla();

        // Obtener de vuelta todos los estudiantes de la base de datos.
        await mostrarEstudantes();
    } else {
        alert("Ocurrió un error. Vuelva a intentarlo más tarde.");
    }
};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Muestra a todos los estudiantes de la base de datos.
const mostrarEstudantes = async () => {
    // Tabla.
    const tabla = document.getElementById("tabla");

    // Variables para interactuar con el DOM.
    let tr, td, texto, renglon, modificar, eliminar;

    // tbody de la tabla.
    const tablaContenido = document.getElementById("tabla__contenido");

    // Enviar petición 'GET' a la API para obtener a todos los estudiantes.
    const respuesta = await fetch("http://localhost:8080/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (respuesta.ok) {
        // Guardado de la petición en formato json.
        const estudiantes = await respuesta.json();

        // Creación de un renglón por cada estudiante registrado.
        estudiantes.forEach(estudiante => {
            // Creación de los td modificar.
            modificar = document.createElement("td");
            modificar.appendChild(document.createTextNode("Modificar"));
            modificar.className = "modificar";

            // Agregar la función configurarModificar a cada elemento modificar.
            modificar.addEventListener("click", () => {
                configurarModificar(estudiante);
            });

            // Creación de los td eliminar.
            eliminar = document.createElement("td");
            eliminar.appendChild(document.createTextNode("Eliminar"));
            eliminar.className = "eliminar";

            // Agregar la función eliminarEstudiante a cada elemento eliminar.
            eliminar.addEventListener("click", () => {
                eliminarEstudiante(estudiante.student_id);
            });

            // Pasar los datos del estudiante a la lista renglon.
            renglon = [
                estudiante.name.first,
                estudiante.name.last,
                estudiante.student_id,
                estudiante.carreer,
            ];

            // Creación de un elemento tr
            tr = document.createElement("tr");

            // Creación del renglón en función de los datos del estudiante.
            for (let i = 0; i < renglon.length; i++) {
                td = document.createElement("td");
                texto = document.createTextNode(renglon[i]);
                td.appendChild(texto);
                tr.appendChild(td);
                tr.appendChild(modificar);
                tr.appendChild(eliminar);
                tablaContenido.append(tr);
            }
        });
    }
};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Función para vaciar los datos del estudiante en el formulario de modificar.
const configurarModificar = (estudiante) => {
    // Campos de texto.
    const first = document.getElementById("first");
    const last = document.getElementById("last");
    const student_id = document.getElementById("student_id");
    const carreer = document.getElementById("carreer");

    // Mostrar la ventana de modificación
    mostrarVentanaModificacion();

    // Vaciado de datos
    first.value = estudiante.name.first;
    last.value = estudiante.name.last;
    student_id.value = estudiante.student_id;
    carreer.value = estudiante.carreer;
};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Función que "vacía" la tabla. Servirá para las funciones modificar y eliminar.
const reiniciarTabla = () => {
    const tbody = document.querySelectorAll("tbody tr td");

    tbody.forEach(tr => {
        tr.remove();
    });
};
// -------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Función que muestra la ventana de modificación
const mostrarVentanaModificacion = () => {
    // Obtener ventana y formulario de modificación.
    const ventana = document.getElementById("ventana");
    const contenedor_modificar = document.getElementById("contenedor_modificar");

    // CSS para mostrarlo.
    ventana.style.display = "block";
    contenedor_modificar.style.display = "flex";
};
// -------------------------------------------------------------------------------------------
// Función que oculta la ventana de modificación
const ocultarVentanaModificacion = () => {
    // Obtener ventana y formulario de modificación.
    const ventana = document.getElementById("ventana");
    const contenedor_modificar = document.getElementById("contenedor_modificar");

    // CSS para mostrarlo.
    ventana.style.display = "none";
    contenedor_modificar.style.display = "none";
};

export {
    agregarEstudiante,
    eliminarEstudiante,
    actualizarEstudiante,
    mostrarEstudantes,
    ocultarVentanaModificacion,
};