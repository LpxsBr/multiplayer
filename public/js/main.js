const socket = io({transports: ['websocket']});

var square = document.getElementById('square');
var events = document.getElementById('events');

const coresVivas = [
    "#FF0000", // Vermelho
    "#FFA500", // Laranja
    "#FFFF00", // Amarelo
    "#00FF00", // Verde
    "#00FFFF", // Ciano
    "#0000FF", // Azul
    "#800080", // Roxo
    "#FF00FF", // Magenta
    "#FF4500", // Laranja Vermelho
    "#FFD700", // Ouro
    "#32CD32", // Verde Limão
    "#FF69B4", // Rosa Choque
    "#4B0082", // Índigo
    "#00FF7F", // Verde Primavera
    "#8A2BE2"  // Azul Violeta
  ];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let cor = coresVivas[getRandomInt(coresVivas.length)]

window.addEventListener('load', (e)=>{
    e.preventDefault()
    square.style.backgroundColor = cor
    socket.emit('user color', cor)
})

var bottom = 10
var left = 10

addEventListener('keypress', (event)=>{
    console.log(event.key)


    if(left >= 10 && bottom >= 10 && bottom < window.innerHeight - 50 && left < window.innerWidth - 50){

        if(event.key == 'w') bottom+=10
        if(event.key == 's') bottom-=10
        if(event.key == 'd') left+=10
        if(event.key == 'a') left-=10

    }

    if(left < 10 || bottom < 10){
        if(event.key == 'w') bottom+=10
        if(event.key == 'd') left+=10
    }

    console.log(window.innerHeight);

    if(bottom > window.innerHeight - 10 || left > window.innerWidth - 10){
        if(event.key == 's') bottom-=10
        if(event.key == 'a') left-=10
    }

    square.style.bottom = `${bottom}px`
    square.style.left = `${left}px`
    
    socket.emit('square_position', {name: 'teste', cor, pos: {x: bottom, y: left}})

})

function change(){
    
    socket.emit('user color', coresVivas[getRandomInt(coresVivas.length)])
}

socket.on('square_position', (msg) => {
    const item = document.createElement('li');
    item.textContent = JSON.stringify(msg);
    events.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  })