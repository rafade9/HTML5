// EJEMPLOS CON keypress
var configTeclado = {prevent_repeat : true};

var eventoTeclado = new window.keypress.Listener(this,configTeclado);

function pulsaA(){
  console.log('Has pulsado a');
}

eventoTeclado.simple_combo('a',pulsaA);

//EVENTOS MOUSE
var miCanvas;

function inicializar(){
  miCanvas = document.getElementById('canvas');

  miCanvas.addEventListener('mousedown',clicRaton,false);
  miCanvas.addEventListener('mouseup',sueltaRaton,false);
  miCanvas.addEventListener('mousemove',posicionRaton,false);
}

function clicRaton(e){
  console.log('Pulsado raton')
}

function sueltaRaton(e){
  console.log('Raton liberado');
}

function posicionRaton(e){
  var x = e.pageX;
  var y = e.pageY;
  console.log('x:' + x + ', y:' + y);
}

//CREAR FIGURAS EN CANVAS
var Personaje = function(x,y){
  this.x = x;
  this.y = y;
  this.derecha = true;

  this.dibuja = function(){
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.x,this.y,50,50);
  }
}

//FIGURA CON PNG
var imgRex;

function inicializar(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //CARGAMOS IMAGEN NASA
  imgRex = new Image();
  imgRex.src = 'img/nasa.png';

  setInterval(function(){
    principal();
  },1000/fps);
}

var Protagonista = function(x,y){
  this.x = x;
  this.y = y;

  this.dibuja = function(){
    ctx.drawImage(imgRex,this.x,this.y);
  }

  this.texto = function(){
    ctx.font = '30px impact';
    ctx.fillStyle = '#555555';
    ctx.fillText('X: ' + this.x, 100,100);
  }
}
