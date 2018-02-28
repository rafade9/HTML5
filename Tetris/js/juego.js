//keypress
var configTeclado = {prevent_repeat : false};
var eventoTeclado = new window.keypress.Listener(this,configTeclado);

var canvas;
var ctx;
var FPS = 50;

var anchoCanvas = 400;
var altoCanvas = 640;

var anchoTablero = 10;
var altoTablero = 20;

var margenSuperior = 4;
var margenLateral = 1;

var anchoF = 40;
var altoF = 40;

//(12x17) - 10x16
var tablero = [
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

var tableroCopia = [
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

function dibujarTablero(){
  for(py=margenSuperior;py<altoTablero;py++){
    for(px=margenLateral;px<anchoTablero+1;px++){

      if(tablero[py][px]!=0){

        if(tablero[py][px]==1)
          ctx.fillStyle=rojo;
        if(tablero[py][px]==2)
          ctx.fillStyle=morado;
        if(tablero[py][px]==3)
          ctx.fillStyle=naranja;
        if(tablero[py][px]==4)
          ctx.fillStyle=amarillo;
        if(tablero[py][px]==5)
          ctx.fillStyle=verde;
        if(tablero[py][px]==6)
          ctx.fillStyle=cyan;
        if(tablero[py][px]==7)
          ctx.fillStyle=azul;

        ctx.fillRect((px-margenLateral)*anchoF,(py-margenSuperior)*altoF,anchoF,altoF);
      }

    }
  }

}

function reseteaTablero(){
  console.log("perdiste");
  for(py=0;py<21;py++){
    for(px=0;px<12;px++){
      tablero[py][px]=tableroCopia[py][px];
    }
  }
}

//COLORES DE PIEZAS
var rojo = '#FF0000';
var morado = "#800080";
var naranja = "#FF8C00";
var amarillo = "#FFD700";
var verde = "#008000";
var cyan = "#00CED1";
var azul = "#0000CD";

var fichaGrafico= [
  [
  	[
    	[0,0,0,0],
    	[0,1,1,0],
    	[0,1,1,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,0],
    	[0,1,1,0],
    	[0,1,1,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,0],
    	[0,1,1,0],
    	[0,1,1,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,0],
    	[0,1,1,0],
    	[0,1,1,0],
    	[0,0,0,0]
  	]
  ],

  [
  	[
    	[0,0,0,0],
    	[2,2,2,2],
    	[0,0,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,2,0],
    	[0,0,2,0],
    	[0,0,2,0],
    	[0,0,2,0]
  	],

  	[
    	[0,0,0,0],
    	[2,2,2,2],
    	[0,0,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,2,0],
    	[0,0,2,0],
    	[0,0,2,0],
    	[0,0,2,0]
  	]

  ],

  [
  	[
    	[0,0,0,0],
    	[0,0,3,3],
    	[0,3,3,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,3,0],
    	[0,0,3,3],
    	[0,0,0,3],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,0],
    	[0,0,3,3],
    	[0,3,3,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,3,0],
    	[0,0,3,3],
    	[0,0,0,3],
    	[0,0,0,0]
  	]

  ],

  [
  	[
    	[0,0,0,0],
    	[0,4,4,0],
    	[0,0,4,4],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,4],
    	[0,0,4,4],
    	[0,0,4,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,0],
    	[0,4,4,0],
    	[0,0,4,4],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,4],
    	[0,0,4,4],
    	[0,0,4,0],
    	[0,0,0,0]
  	]

  ],

  [
  	[
    	[0,0,0,0],
    	[0,5,5,5],
    	[0,5,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,5,0],
    	[0,0,5,0],
    	[0,0,5,5],
    	[0,0,0,0]
  	],

  	[
    	[0,0,0,5],
    	[0,5,5,5],
    	[0,0,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,5,5,0],
    	[0,0,5,0],
    	[0,0,5,0],
    	[0,0,0,0]
  	]

  ],

  [
  	[
    	[0,0,0,0],
    	[0,6,6,6],
    	[0,0,0,6],
    	[0,0,0,0]
  	],

  	[
    	[0,0,6,6],
    	[0,0,6,0],
    	[0,0,6,0],
    	[0,0,0,0]
  	],

  	[
    	[0,6,0,0],
    	[0,6,6,6],
    	[0,0,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,6,0],
    	[0,0,6,0],
    	[0,6,6,0],
    	[0,0,0,0]
  	]
  ],


  [
  	[
    	[0,0,0,0],
    	[0,7,7,7],
    	[0,0,7,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,7,0],
    	[0,0,7,7],
    	[0,0,7,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,7,0],
    	[0,7,7,7],
    	[0,0,0,0],
    	[0,0,0,0]
  	],

  	[
    	[0,0,7,0],
    	[0,7,7,0],
    	[0,0,7,0],
    	[0,0,0,0]
  	]
  ]
];

var pieza;

var ObjPieza = function(){
  this.x = 0;
  this.y = 0;

  this.angulo = 0;
  this.tipo = 0;

  this.retraso = 50;
  this.fotograma = 0;

  this.nueva = function(){
    this.tipo = Math.floor(Math.random()*7);
    this.y = 0;
    this.x = 4;
  }

  this.dibujar = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){

        if(fichaGrafico[this.tipo][this.angulo][py][px]!=0){

          if(fichaGrafico[this.tipo][this.angulo][py][px]==1)
  					ctx.fillStyle=rojo;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==2)
  					ctx.fillStyle=morado;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==3)
  					ctx.fillStyle=naranja;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==4)
  					ctx.fillStyle=amarillo;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==5)
  					ctx.fillStyle=verde;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==6)
  					ctx.fillStyle=cyan;
  				if(fichaGrafico[this.tipo][this.angulo][py][px]==7)
  					ctx.fillStyle=azul;

          ctx.fillRect((this.x + px - margenLateral)*anchoF,(this.y + py - margenSuperior)*altoF,anchoF,altoF);
        }

      }
    }
  };

  this.compruebaSiPierde = function(){
    var pierde = false;

    for(px=1;px<anchoTablero+1;px++){
      if(tablero[2][px]>0){
        pierde = true;
      }
    }

    return pierde;
  }

  this.limpia = function(){
    var filaCompleta = true;

    /*for(py = margenSuperior; py < altoTablero; py++){
      filaCompleta = true;

      for(px = 1; px < anchoTablero + 1; px++){
        if(tablero[py][px]==0){
          filaCompleta = false;
        }
      }

      if(filaCompleta == true){
          for(px = 1; px < anchoTablero + 1; px++){
            tablero[py][px]=tablero[py-1][px];
          }
      }

    }*/
    var filas = [];

    for(py = altoTablero - 1; py > margenSuperior; py--){

      for(px = margenLateral; px < anchoTablero; px++){
        if(tablero[py][px]==0){
          filaCompleta = false;
        }
      }
      if(filaCompleta == true){
        console.log("fila completa " + py);
        filas.push(py)
      }

      filaCompleta = true;
    }

    for(f = 0; f < filas.length ; f++){
      console.log("Ciclo " + f);
      for(py = filas[f]; py > margenSuperior; py --){
        for(px = margenLateral; px < anchoTablero + 1; px++){
          tablero[py][px] = tablero[py-1][px];
        }
      }
    }

    for(px = margenLateral; px < anchoTablero + 1; px++){
      console.log("FILA:"+filas[0]+" ->PA: " + tablero[19][px] + "---PN: " + tablero[19-1][px]);
    }

    filas = [];
    //console.log("filas post limpieza "+filas.length);

  }

  this.caer = function(){
    if(this.fotograma < this.retraso){
      this.fotograma++;
    }
    else{
      if(this.colision(this.angulo,this.y+1,this.x)==false){
        this.y++;
        this.fotograma = 0;
      }

      else{
        this.fijar();
        this.limpia();
        this.nueva();

        if(this.compruebaSiPierde()==true){
          reseteaTablero();
        }
      }
    }
  }

  this.fijar = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        if(fichaGrafico[this.tipo][this.angulo][py][px]>0){
          tablero[this.y+py][this.x+px] = fichaGrafico[this.tipo][this.angulo][py][px];
        }
      }
    }
  }

  this.colision = function(anguloNuevo, yNueva, xNueva){
    var resultado = false;

    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        if(fichaGrafico[this.tipo][anguloNuevo][py][px]>0){
          if(tablero[yNueva+py][xNueva+px]>0){
            resultado = true;
          }
        }
      }
    }

    return resultado;
  }

  this.rotar = function(){
    console.log("Rotar");

    var anguloNuevo = this.angulo;

    if(anguloNuevo < 3){
      anguloNuevo++;
    }
    else{
      anguloNuevo = 0;
    }

    if(this.colision(anguloNuevo,this.y,this.x)==false){
      this.angulo = anguloNuevo;
    }
  }

  this.abajo = function(){

    if(this.colision(this.angulo,this.y+1,this.x)==false){
        this.y++;
    }

  }

  this.izquierda = function(){
    if(this.colision(this.angulo,this.y,this.x-1)==false){
      this.x--;
    }
  }

  this.derecha = function(){
    if(this.colision(this.angulo,this.y,this.x+1)==false){
      this.x++;
    }
  }

  this.nueva();

}

//Lectura del teclado keypress
eventoTeclado.simple_combo('up',function(){
  pieza.rotar();
});

eventoTeclado.simple_combo('down',function(){
  pieza.abajo();
});

eventoTeclado.simple_combo('left',function(){
  pieza.izquierda();
});

eventoTeclado.simple_combo('right',function(){
  pieza.derecha();
});
//Fin lectura teclado

function inicializar(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;

  pieza = new ObjPieza();

  setInterval(function(){
    principal();
  },1000/FPS);
}

function borrarCanvas(){
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;
}

function principal(){
  borrarCanvas();
  dibujarTablero();
  pieza.caer();
  pieza.dibujar();
}
