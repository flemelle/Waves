var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var introduction =  document.querySelector('#intro');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let tab = [];
class Thing {
    constructor (X, Y, size){
        this.X = X;
        this.Y = Y;
        this.size = size;
        this.ray = 0;
        this.color = [23, 150, 159, 1];
    }
}

window.addEventListener ('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

introduction.addEventListener('click', function () {
    introduction.classList.toggle('hide');
    setInterval(animation, 20, tab);
})

canvas.addEventListener('click', function(e) {
    let position = new Thing(e.clientX, e.clientY, 0);
    tab.push(position);
})

function circle(tab){
    for (var i = 0; i < tab.length; i++){
        if (tab[i].color[3] > 0){
            draw(tab[i]);
            tab[i].size ++;
            tab[i].color[3] -= 0.001;
            if ((tab[i].size == 30) && (tab[i].ray < 2)){
                tab[i].ray++;
                let next = new Thing;
                next.X = tab[i].X;
                next.Y = tab[i].Y;
                next.ray = tab[i].ray;
                next.size = 0;
                tab.push(next);
            }
        } else {
            tab.splice(i, 1);
        }
    }
}
function animation(tab){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circle(tab);
}
function draw(object){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(" + object.color[0] + "," + object.color[1]+ "," + object.color[2] + "," + object.color[3] + ")";
    ctx.beginPath();
    ctx.arc(object.X, object.Y, object.size, 0, 2*Math.PI);    
    ctx.stroke();
}