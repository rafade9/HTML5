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

var tileMap;
var tilePx = 32;

var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,0,0,0,2,2,2,0,2,2,2,0],
  [0,2,0,2,0,0,2,2,0,2,2,2,0,2,0],
  [0,2,0,2,2,2,2,0,0,2,0,2,0,2,0],
  [0,2,0,0,0,2,0,0,0,2,0,2,2,0,0],
  [0,0,0,0,0,0,2,0,2,2,0,0,2,2,0],
  [0,2,2,2,0,0,2,2,2,0,0,0,0,2,0],
  [0,2,0,2,2,0,2,0,0,0,2,3,0,2,0],
  [0,2,0,0,2,2,2,2,2,2,2,2,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var protagonista;
var enemigo = [];
var antorcha;

var Jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = colorProta;
  this.llave = false;

  this.dibuja = function(){
    ctx.drawImage(tileMap,1*tilePx,1*tilePx,tilePx,tilePx,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.victoria = function(){
    console.log('Has ganado');
    this.x=1;
    this.y=1;
    this.llave = false;
    escenario[7][11] = 3;
  }

  this.muerte = function(){
    console.log('Has muerto');
    this.x=1;
    this.y=1;
    this.llave = false;
    escenario[7][11] = 3;
  }

  this.colisionEnemigo = function(x,y){
    if(this.x == x && this.y == y){
      this.muerte();
    }
  }
}

var Enemigo = function(x,y){
  this.x = x;
  this.y = y;
  console.log("Enemigo creado");

  this.dibuja = function(){
    ctx.drawImage(tileMap,0*tilePx,1*tilePx,tilePx,tilePx,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.direccion = Math.floor(Math.random()*4);

  this.retraso = 50;
  this.fotograma = 0;

  this.compruebaColision = function(x,y){
    if(escenario[y][x] == 0)
      return true;
    else
      return false;
  }

  this.mueve = function(){

    protagonista.colisionEnemigo(this.x,this.y)

    if(this.fotograma < this.retraso){
        this.fotograma++;
    }
    else{
      this.fotograma = 0;
      //ARRIBA
      if(this.direccion==0){
        if(this.compruebaColision(this.x, this.y-1) == false){
          this.y--;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }//FIN ARRIBA

      //ABAJO
      if(this.direccion==1){
        if(this.compruebaColision(this.x, this.y + 1) == false){
          this.y++;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }//FIN ABAJO

      //IZQUIERDA
      if(this.direccion==2){
        if(this.compruebaColision(this.x-1, this.y) == false){
          this.x--;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }//FIN IZQUIERDA

      //DERECHA
      if(this.direccion==3){
        if(this.compruebaColision(this.x+1, this.y) == false){
          this.x++;
        }
        else{
          this.direccion = Math.floor(Math.random()*4);
        }
      }//FIN DERECHA

    }//fin else

  }//fin mueve
}

function dibujaEscenario(){
  var color;
  for(y = 0;y < 10; y++){
    for(x = 0; x < 15; x++){
      var tile = escenario[y][x];

      //1.Imagen, 2.Posicion pt x, 3.Posicion pt y, 4.Px X a recortar,
      //5.Px y a recortar, 6.Posicion x donde colocar, 7.Posicion y donde colocar
      //8.Ancho que tendra, 9.Alto que tendra
      ctx.drawImage(tileMap,tile*tilePx,0,tilePx,tilePx,anchoF*x,altoF*y,anchoF,altoF);
    } //fin for x
  } //fin for y
}

var Antorcha = function(x,y){
  this.x = x;
  this.y = y;

  this.fotograma = 0; //0-3
  this.retraso = 10;
  this.contador = 0;

  this.cambiaFotograma = function(){
    if(this.fotograma < 3){
      this.fotograma++;
    }
    else{
      this.fotograma = 0;
    }
  }

  this.dibuja = function(){
    if(this.contador < this.retraso){
      this.contador++;
    }
    else{
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

  }
}


function inicializar(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tilemap.png';

  //CREAR PROTAGONISTA
  protagonista = new Jugador();

  //CREAR ENEMIGOS
  enemigo.push(new Enemigo(1,6));
  enemigo.push(new Enemigo(11,2));
  enemigo.push(new Enemigo(6,7));

  //DIBUJA Antorcha
  antorcha1 = new Antorcha(0,0);
  antorcha2 = new Antorcha(14,0);
  antorcha3 = new Antorcha(0,9);
  antorcha4 = new Antorcha(14,9);

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

  antorcha1.dibuja();
  antorcha2.dibuja();
  antorcha3.dibuja();
  antorcha4.dibuja();

  protagonista.dibuja();

  for(e=0; e<enemigo.length; e++){
    enemigo[e].dibuja();
    enemigo[e].mueve();
  }
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
  if(objeto == 3){
    protagonista.llave = true;
    console.log('Has recogido la llave');
    escenario[protagonista.y][protagonista.x] = 2;
  }
  if(objeto == 1) {
    if(protagonista.llave == true){
        protagonista.victoria();
    } else{
      console.log('Te falta la llave, no puedes pasar');
    }

  }
}
