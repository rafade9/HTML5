var configTeclado = {prevent_repeat : true};

var eventoTeclado = new window.keypress.Listener(this,configTeclado);

function pulsaA(){
  console.log('Has pulsado a');
}

eventoTeclado.simple_combo('a',pulsaA);
