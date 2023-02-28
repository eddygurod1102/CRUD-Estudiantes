const boton = document.getElementById("boton2");
const boton2 = document.getElementById('boton3');

// Busca alumnos usando fetch() en forma de promesa
const buscarAlumnos = () => {
    fetch("http://localhost:8080/students", {
        method: "GET",
        headers: {
            "Content-type": "application-json"
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            alert("Error en la petición");
        }
    }).then(data => {
        console.log(data);
    }).catch(err => {
        alert("Ocurrió un error. Vuelva a intentarlo más tarde.", err);
    });
};

// Busca alumnos con fetch(), pero ahora utilizando async y await
const buscarAlumnos2 = async () => {
    const res = await fetch("http://localhost:8080/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    let data;

    if (res.ok) {
        data = await res.json();
        console.log(data);
    } else {
        alert("Ocurrió un error en el servidor. Por favor, vuelva a intentarlo más tarde");
    }
};

boton.addEventListener("click", buscarAlumnos);
boton2.addEventListener("click", buscarAlumnos2);
