const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("top secret token"));

app.use(
  session({
    secret: "confirm secret token",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new PassportLocal(function (username, password, done) {
    //done(err,{name: "David"},{})
    //Conexion a base de datos - se realizara hardcode con fines ilustrativos
    if (username === "davidnherran" && password === "12345")
      return done(null, { id: 1, name: "David" });

    done(null, false);
  })
);

//{ id: 1, name: "David" }

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "David" });
});

app.set("view engine", "ejs");

app.get("/", (req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login");
},(req, res) => {
  //Si inicio sesion, mostrara bienvenida
  res.send("Proyecto inicializado correctamente");
  //Si no inicia sesion, redireccionara a /login
});

app.get("/login", (req, res) => {
  //mostrar formulario de login
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.listen(8080, () => console.log("Server started"));
