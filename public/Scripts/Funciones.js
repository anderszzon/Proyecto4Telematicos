var canvas, lienzo, jugador, balon;
var goles = [0, 0];

function iniciar_WEBCAM(){
  //Tomar los elementos creados en la interface y almacenarlos en variables
  const video = document.getElementById('video');
  const errorMsgElement = document.querySelector('span#errorMsg');
  //Asignar dimensionalidad al área de video
  const constraints = {
  audio: false,
  video: {width: 680, height: 480}
  };
  // Solicitar permiso para acceder a la WEBCAM
  async function init() {
  try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
  } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
  }
  // Si la función retorna que es permitido inicie la proyección en la página
  function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
  }
  // Cargar al inicio
  init();
}

function actualizar() {
    lienzo.fillStyle = 'rgb(230, 136, 53)';  // CANCHA
    //Dibuja un rectángulo
    lienzo.fillRect(10, 10, 900, 500);
    lienzo.strokeStyle = 'rgb(255, 255, 255)';
    lienzo.arc(460, 260, 100, 0, 2*Math.PI, 1); // circulo central
    lienzo.stroke();
    lienzo.lineWidth = 1;
    lienzo.beginPath();

    lienzo.beginPath();
    lienzo.fillStyle = 'rgb(218, 105, 87)';  //color del BALON
    lienzo.arc(1, 260, 250, 0, 2*Math.PI, 1); // circulo central
    lienzo.stroke();

    lienzo.beginPath();
    lienzo.arc(900, 260, 250, 0, 2*Math.PI, 1); // circulo central
    lienzo.fillStyle = 'rgb(182, 133, 84)';  //color del BALON

    lienzo.stroke();

    lienzo.moveTo(460, 10);
    lienzo.lineTo(460, 510);
    lienzo.stroke();


    lienzo.beginPath();

    lienzo.fillRect(60, 160, 100, 200);
    lienzo.fillRect(750, 160, 100, 200);

    lienzo.fillStyle = 'rgb(184, 184, 184)';  //color del BALON
 
    lienzo.fillRect(60, 235, 40, 40);
    lienzo.fillRect(810, 235, 40, 40);
    lienzo.fill();




    lienzo.beginPath();
    lienzo.fillStyle = 'rgb(137, 73, 39)';  //color del BALON
    lienzo.arc(balon.x, balon.y, 15, 0, 2*Math.PI, 1); //posicion del balon  
    lienzo.fill();
    //lienzo.fillRect(300, 240, 10, 40);
    //lienzo.fillRect(600, 240, 10, 40);
    lienzo.beginPath();

    for (var i = 0; i < jugador.length; i++) {
        lienzo.fillStyle = jugador[i].color;
        lienzo.fillRect(jugador[i].x, jugador[i].y, jugador[i].width, jugador[i].height);
      }

      lienzo.font = "30px Courier New";
      lienzo.fillText("Stephen Curry", 40, 50);
      lienzo.fillText("Puntuacion: "+String(goles[0]), 40, 80); 
      lienzo.fillText("ejeX: "+String(jugador[0].x) +", ejeY: "+String(jugador[0].y), 40, 110); 
      lienzo.strokeText("Lebron James", 640, 50);
      lienzo.strokeText("Puntuacion: "+String(goles[1]), 640, 80);
      lienzo.strokeText("ejeX: "+String(jugador[1].x) +", ejeY: "+String(jugador[1].y), 640, 110);

       lienzo.drawImage(video, 0, 0, 640, 480);
  }

function draw() {
    iniciar_WEBCAM();
    var audio = document.getElementById("audioPlay");

    canvas = document.getElementById('canvas');
    lienzo = canvas.getContext('2d');
    j1u = document.getElementById('j1u');
    j1i = document.getElementById('j1i');
    j1d = document.getElementById('j1d');
    j1a = document.getElementById('j1a');
    j2u = document.getElementById('j2u');
    j2i = document.getElementById('j2i');
    j2d = document.getElementById('j2d');
    j2a = document.getElementById('j2a');

    balon = {
        x : 460,
        y : 260
    }

    jugador = [];
      jugador.push({
        x: 300, y: 240,
        width: 10, height: 40,
        color: '#eeeeee'
      });
      jugador.push({
        x: 600, y: 240,
        width: 10, height: 40,
        color: '#000000'
      });

    actualizar();

    j1u.onclick = function(){
        jugador[0].y = jugador[0].y - 10;
        if ((jugador[0].y-balon.y < 20)&(jugador[0].y-balon.y > -60)&(balon.x-jugador[0].x < 30) & (balon.x-jugador[0].x > -20)){
            balon.y = balon.y - 10;
        }
        actualizar();
      }

    j1i.onclick = function(){
        jugador[0].x = jugador[0].x - 10;
        if ((jugador[0].x-balon.x < 20)&(jugador[0].x-balon.x > -20)&(balon.y-jugador[0].y < 60)& (balon.y-jugador[0].y > -20)){
            balon.x = balon.x - 10;
        }
        actualizar();
        
      }

    j1d.onclick = function(){
        jugador[0].x = jugador[0].x + 10;
        if ((balon.x-jugador[0].x < 30)&(balon.x-jugador[0].x > -20)&(balon.y-jugador[0].y < 60)& (balon.y-jugador[0].y > -20)){
            balon.x = balon.x + 10;
        }
        if((balon.x==830)&((balon.y>170)&(balon.y<350))){
            goles[0]=goles[0]+1;
            lienzo.drawImage(video, 10, 10, 640, 480);
            audio.play();
            setTimeout(Clic, 3000);
            
        }
        actualizar();
        
      }
    
    j1a.onclick = function(){
        jugador[0].y = jugador[0].y + 10;
        if ((balon.y-jugador[0].y < 60)&(balon.y-jugador[0].y > -20)&(balon.x-jugador[0].x < 30) & (balon.x-jugador[0].x > -20)){
            balon.y = balon.y + 10;
        }
        actualizar();
      }

    j2u.onclick = function(){
        jugador[1].y = jugador[1].y - 10;
        if ((jugador[1].y-balon.y < 20)&(jugador[1].y-balon.y > -60)&(balon.x-jugador[1].x < 30) & (balon.x-jugador[1].x > -20)){
            balon.y = balon.y - 10;
        }
        actualizar();
      }

    j2i.onclick = function(){
        jugador[1].x = jugador[1].x - 10;
        if ((jugador[1].x-balon.x < 20)&(jugador[1].x-balon.x > -20)&(balon.y-jugador[1].y < 60)& (balon.y-jugador[1].y > -20)){
            balon.x = balon.x - 10;
        }
        if((balon.x==90)&((balon.y>170)&(balon.y<350))){
            goles[1]=goles[1]+1;
            lienzo.drawImage(video, 10, 10, 640, 480);
            audio.play();
            setTimeout(Clic, 3000);
        }
        actualizar();
        
      }

    j2d.onclick = function(){
        jugador[1].x = jugador[1].x + 10;
        if ((balon.x-jugador[1].x < 30)&(balon.x-jugador[1].x > -20)&(balon.y-jugador[1].y < 60)& (balon.y-jugador[1].y > -20)){
            balon.x = balon.x + 10;
        }
        actualizar();
      }
    
    j2a.onclick = function(){
        jugador[1].y = jugador[1].y + 10;
        if ((balon.y-jugador[1].y < 60)&(balon.y-jugador[1].y > -20)&(balon.x-jugador[1].x < 30) & (balon.x-jugador[1].x > -20)){
            balon.y = balon.y + 10;
        }
        actualizar();
      }
}


