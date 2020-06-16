const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //Si inicio sesion, mostrara bienvenida
  //Si no inicia sesion, redireccionara a /login
});

app.get("/login", (req, res) => {
  //mostrar formulario de login
  res.render("login");
});

app.post("/login", (req, res) => {
  //recibir credenciales e iniciar sesion
});

app.listen(8080, () => console.log("Server started"));
