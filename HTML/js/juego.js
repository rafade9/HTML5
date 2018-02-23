var vida = 100;
var ataque = 10;
var pocion = 20;

function muestraVida(){
  console.log("Nivel de vida del Héroe")
  console.log(vida);
}

function ataqueEnemigo(){
  vida -= ataque;
  muestraVida();
}

function bebePocion(){
  vida += pocion;
  muestraVida();
}
