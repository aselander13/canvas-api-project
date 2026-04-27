let canvas = document.getElementById("canvas");
let ctx =canvas.getContext("2d");
let colorPicker =document.getElementById("colorPicker");
let brushSize = document.getElementById("brushSize");
let isDrawing = false;

let eraser = false;
let prevStates = [];

saveState();

function saveState() {
    if (prevStates.length >10) {
        prevStates.shift();
    }
    prevStates.push(canvas.toDataURL());
}

canvas.addEventListener("mousedown", function() {
    isDrawing = true;
});

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
    ctx.beginPath();
    saveState();
});
canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return;
    
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y =e.clientY - rect.top;
    
    ctx.lineWidth = brushSize.value;
    ctx.lineCap ="round";
    
    if (eraser) {
        ctx.strokeStyle ="white";
    } else {
        ctx.strokeStyle = colorPicker.value;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

function usePen(){
    eraser = false;
}

function useEraser() {
    eraser =true;
}

function undo(){
    if (prevStates.length> 1) {
        prevStates.pop();
        let img =new Image();
        img.src = prevStates[prevStates.length -1];
        img.onload =function(){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(img,0,0);
        };
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    prevStates =[];
    saveState();
}
