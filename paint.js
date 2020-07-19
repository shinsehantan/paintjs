const canvas = document.querySelector('.box');
const ctx = canvas.getContext('2d');
const paintColor = document.getElementsByClassName('controls__color');
const colorArray = Array.from(paintColor);
const range = document.getElementById('range_bar');
console.log(range.value)
canvas.width = 400;
canvas.height = 500;

ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;

let painting = false;
function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}
function mouseDownHandler(event) {
    startPainting();
}

function mouseMoveHandler(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}

function colorChange(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

colorArray.forEach(x => x.addEventListener("click",colorChange));

function clickHandler(event) {
    // const brushSize = event.target.value
    const brushSize = range.value;
    ctx.lineWidth = brushSize;
}

range.addEventListener('mouseup',clickHandler);

canvas.addEventListener('mousemove',mouseMoveHandler);
canvas.addEventListener('mousedown',mouseDownHandler);
canvas.addEventListener('mouseleave',stopPainting);
canvas.addEventListener('mouseup',stopPainting);