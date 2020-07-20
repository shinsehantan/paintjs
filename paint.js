const canvas = document.querySelector('.box');
const ctx = canvas.getContext('2d');
const paintColor = document.getElementsByClassName('controls__color');
const colorArray = Array.from(paintColor);
const range = document.getElementById('range_bar');
const mode = document.querySelector('.button1');
const save = document.querySelector('.button2');

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;

let painting = false;
let filling = false;

alert("draw yourself!");

function saveHandler(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    console.log(image);
    link.href = image;
    link.download = "paintJS";
    link.click();
}

function fillingMode() {
    if (filling === true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function clickMode() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint"
    }
}

mode.addEventListener("click", clickMode);

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
    ctx.fillStyle = color;
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
canvas.addEventListener('click',fillingMode);
save.addEventListener('click',saveHandler);