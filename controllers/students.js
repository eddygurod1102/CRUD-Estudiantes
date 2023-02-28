// Requerir express y ObjectId de mongodb.
const express = require("express");
const ObjectId = require("mongodb").ObjectId;

// Requerir el archivo de base de datos.
const database = require("../database.js")

// Usar Router() de express
const router = express.Router();

// Obtener todos los estudiantes registrados.
router.get("/", async (req, res) => {
    // Lista que guardará todos los estudiantes.
    let envio = [];
    
    try {
        await database.setConnection();

        const resultado = database.getDB().collection("students").find();
        
        await resultado.forEach(student => {
            envio.push(student);
        });

        res.send(envio);
        console.log("ok");
    } catch(err) {
        console.error(err);
    } finally {
        database.close();
    }
});

// Agrega un estudiante
router.post("/", async (req, res) => {
    try {
        await database.setConnection();        
        const student = {
            name: {
                first: req.body.name["first"],
                last: req.body.name["last"]
            },
            student_id: req.body.student_id,
            carreer: req.body.carreer
        };
    
        await database.getDB().collection("students").insertOne(student);
        res.json("saved");
    } catch (err) {
        console.error(err);
    } finally {
        database.close();
    }
});

// Actualizar un estudiante
router.put("/", async (req, res) => {
    try {
        await database.setConnection();

        const filtro = {
            student_id: req.body.student_id,
        };

        const actualizarDocumento = {
            $set: {
                name: {
                    first: req.body.name["first"],
                    last: req.body.name["last"],
                },
                carreer: req.body.carreer,
            }
        };
        await database.getDB().collection("students").updateOne(filtro, actualizarDocumento);
        res.json("updated");
    } catch (err) {
        console.error(err);
    } finally {
        database.close();
    }
});

// Elimina un estudiante por ID
router.delete("/:student_id", async (req, res) => {
    try {
        await database.setConnection();
        const doc = {
            student_id: req.body.student_id,
        }
        const resultado = await database.getDB().collection("students").deleteOne(doc);
        console.log(resultado);
        res.json("deleted");
    } catch (err) {
        console.error(err);
    } finally {
        database.close();
    }
});

module.exports = router;