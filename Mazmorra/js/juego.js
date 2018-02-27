//keypress
var configTeclado = {prevent_repeat : true};
var eventoTeclado = new window.keypress.Listener(this,configTeclado);

var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

//hexadecimal color picker
var bosque = '#014202';
var camino = '#7c5602';
var colorProta = '#000000';
var llave = '#ffcc00';
var puerta = '#0223f7'

var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,0,1,1,1,0,1,1,0,0],
  [0,1,0,1,0,0,1,1,0,1,1,1,0,0,0],
  [0,1,0,1,1,1,1,0,0,1,0,1,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,1,1,0,0],
  [0,0,0,0,0,0,0,0,1,1,0,0,1,1,0],
  [0,1,1,1,0,0,1,1,1,0,0,0,0,1,0],
  [0,1,0,1,1,0,1,0,0,0,1,2,0,1,0],
  [0,1,0,0,1,1,1,1,1,1,1,1,0,3,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var protagonista;

var Jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = colorProta;
  this.llave = false;

  this.dibuja = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.victoria = function(){
    console.log('Has ganado');
    this.x=1;
    this.y=1;
    this.llave = false;
    escenario[7][11] = 2;
  }
}

function dibujaEscenario(){
  var color;
  for(y = 0;y < 10; y++){
    for(x = 0; x < 15; x++){

      if(escenario[y][x] == 0){
        color = bosque;
      }
      if(escenario[y][x] == 1){
        color = camino;
      }
      if(escenario[y][x] == 2){
        color = llave;
      }
      if(escenario[y][x] == 3){
        color = puerta;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
    } //fin for x
  } //fin for y
}

function inicializar(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  protagonista = new Jugador();

  //Lectura del teclado
  eventoTeclado.simple_combo('up',arriba);
  eventoTeclado.simple_combo('down',abajo);
  eventoTeclado.simple_combo('left',izquierda);
  eventoTeclado.simple_combo('right',derecha);

  setInterval(function(){
    principal();
  },1000/FPS);
}

function borraCanvas(){
  canvas.width = 750;
  canvas.height = 500;
}

function principal(){
  borraCanvas();
  dibujaEscenario();
  protagonista.dibuja();
}

//MOVIMIENTOS
function arriba(){
  if(escenario[protagonista.y-1][protagonista.x] != 0){
    protagonista.y--;
    interaccionObjetos();
  }
}

function abajo(){
  if(escenario[protagonista.y+1][protagonista.x] != 0){
    protagonista.y++;
    interaccionObjetos();
  }
}

function izquierda(){
  if(escenario[protagonista.y][protagonista.x-1] != 0){
    protagonista.x--;
    interaccionObjetos();
  }
}

function derecha(){
  if(escenario[protagonista.y][protagonista.x+1] != 0){
    protagonista.x++;
    interaccionObjetos();
  }
}

//ACCIONES Protagonista
function interaccionObjetos(){
  var objeto = escenario[protagonista.y][protagonista.x];
  //llave
  if(objeto == 2){
    protagonista.llave = true;
    console.log('Has recogido la llave');
    escenario[protagonista.y][protagonista.x] = 1;
  }
  if(objeto == 3) {
    if(protagonista.llave == true){
        protagonista.victoria();
    } else{
      console.log('Te falta la llave, no puedes pasar');
    }

  }
}
