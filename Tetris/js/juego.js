//keypress
var configTeclado = {prevent_repeat : true};
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

function dibujarTablero(){
  for(py=margenSuperior;py<altoTablero;py++){
    for(px=margenLateral;px<anchoTablero;px++){

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
  this.x = 5;
  this.y = 7;

  this.angulo = 0;
  this.tipo = 6;

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

          ctx.fillRect((this.x + px)*anchoF,(this.y + py)*altoF,anchoF,altoF);
        }

      }
    }
  };

  this.rotar = function(){
    console.log("Rotar");
  }

  this.abajo = function(){
    console.log("abajo");
  }

  this.izquierda = function(){
    console.log("izquierda");
  }

  this.derecha = function(){
    console.log("derecha");
  }

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
  pieza.dibujar();
}
