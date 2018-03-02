//keypress
var configTeclado = {prevent_repeat : false};
var eventoTeclado = new window.keypress.Listener(this,configTeclado);

var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#014202';
var camino = '#7c5602';

var protagonista;

var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,0,0,1,1,1,0,0,0],
  [0,0,0,0,1,1,0,0,1,1,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,1,1,1,0,0],
  [0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,1,1,0,0,0,0,0,0,0,0,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function dibujaEscenario(){
  var color;
  for(y = 0;y < 10; y++){
    for(x = 0; x < 15; x++){
      if(escenario[y][x] == 0){
        color = muro;
      }
      if(escenario[y][x] == 1){
        color = camino;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
    } //fin for x
  } //fin for y
}

//CLASE JUGADOR
var Jugador = function(){
  this.x = 100;
  this.y = 300;

  this.vy = 0;
  this.vx = 0;

  this.gravedad = 0.5;
  this.friccion = 0.4;

  this.salto = 10;
  this.velocidad = 3;

  this.velocidadMax = 5;

  this.suelo = false;

  this.pulsaIzquierda = false;
  this.pulsaDerecha = false;

  this.colision = function(x,y){
    if(escenario[parseInt(y/altoF)][parseInt(x/anchoF)] == 0){
      return true;
    }

    return false;
  }

  this.correccion = function(lugar){
    //abajo
    if(lugar == 1){
      this.y = parseInt(this.y/altoF)*altoF;
    }

    //arriba
    if(lugar == 2){
      this.y = parseInt((this.y/altoF)+1)*altoF;
    }

    //izquierda
    if(lugar == 3){
      this.x = parseInt(this.x/anchoF)*anchoF;
    }

    //derecha
    if(this.x == 4){
      this.x = parseInt((this.x/anchoF)+1)*anchoF;
    }


  }

  this.fisica = function(){

    //Gravedad
    if(this.suelo == false){
      this.vy += this.gravedad;
    }

    //Movimiento horizontal
    if(this.pulsaDerecha == true && this.vx <= this.velocidadMax){
      this.vx += this.velocidad;
    }

    if(this.pulsaIzquierda == true && this.vx >= 0 - (this.velocidadMax)){
      this.vx -= this.velocidad;
    }

    //Fricion
    if(this.vx > 0){
      this.vx -= this.friccion;

      if(this.vx < 0){
        this.vx = 0;
      }
    }

    if(this.vx < 0){
      this.vx  += this.friccion;

      if(this.vx > 0){
        this.vx = 0;
      }
    }

    //colision techo
    if(this.vy < 0){
      if((this.colision(this.x, this.y) == true) || (this.colision(this.x + anchoF, this.y) == true)){
        this.vy = 0;
        this.correccion(2);
      }
    }

    //colision suelo
    if(this.vy >= 0){
      if((this.colision(this.x, this.y + altoF) == true) || (this.colision(this.x + anchoF, this.y + altoF) == true)){
        this.suelo = true;
        this.vy = 0;
        this.correccion(1);
      }
      else{
        this.suelo = false;
      }
    }

    if(this.vx > 0){
      if((this.colision(this.x + anchoF + this.vx, this.y + 1)==true) || (this.colision(this.x + anchoF + this.vx, this.y + altoF - 1)==true)){

        if(this.x != parseInt(this.x/anchoF)*anchoF){
          this.correccion(4)

        }
        this.vx = 0;

      }
    }

    //Asigne valores
    this.y += this.vy;
    this.x += this.vx;

  }

  //Movimientos
  this.arriba = function(){
    if(this.suelo == true){
      this.vy -= this.salto;
      this.suelo = false;
    }
  }

  this.izquierda = function(){
    this.pulsaIzquierda = true;
  }

  this.derecha = function(){
    this.pulsaDerecha = true;
  }

  this.sueltaIzquierda = function(){
    this.pulsaIzquierda = false;
  }

  this.sueltaDerecha = function(){
    this.pulsaDerecha = false;
  }

  this.dibuja = function(){

    this.fisica();

    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x,this.y,anchoF,altoF);
  }
}
//FIN CLASE JUGADOR


//EVENTOS TECLADO
eventoTeclado.register_combo({
  "keys":"up",
  "on_keydown":function(){
    protagonista.arriba();
  },
  "on_keyup":function(){
    console.log("suelta arriba");
  }
});

eventoTeclado.register_combo({
  "keys":"left",
  "on_keydown": function(){
    protagonista.izquierda();
  },
  "on_keyup":function(){
    protagonista.sueltaIzquierda();
  }
});

eventoTeclado.register_combo({
  "keys":"right",
  "on_keydown": function(){
    protagonista.derecha();
  },
  "on_keyup":function(){
    protagonista.sueltaDerecha();
  }
});

//FIN EVENTOS TECLADO

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  protagonista = new Jugador();

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
