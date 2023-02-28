// Script que contiene la configuración del servidor con express.js

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./database.js");
const app = express();

app.set("port", process.env.PORT || 8080);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

// Incluir routers.
app.use("/students", require("./controllers/students.js"));

app.listen(app.get("port"), () => {
    console.log("Server running in the port 8080");
});