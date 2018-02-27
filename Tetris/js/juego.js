//keypress
var configTeclado = {prevent_repeat : true};
var eventoTeclado = new window.keypress.Listener(this,configTeclado);

var canvas;
var ctx;
var FPS = 50;

var anchoCanvas = 400;
var altoCanvas = 640;

var anchoTablero = 10;
var altoTablero = 16;

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
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

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
  this.tipo = 1;

  this.dibujar = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){

        if(fichaGrafico[this.tipo][this.angulo][py][px]!=0){
          ctx.fillStyle = '#014202';
          ctx.fillRect((this.x+px)*anchoF,(this.y+py)*altoF,anchoF,altoF);
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
  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;
}

function principal(){
  borrarCanvas();
  pieza.dibujar();
}
