const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');
const color = document.getElementsByClassName('color');
const range = document.getElementById('jsRange');
const fillMode = document.getElementById('fillMode');
const saveMode = document.getElementById('saveMode');
// const checked = document.querySelector('.checked');

let drawing = false;
let filling = false;


//=== Default drawing style
context.strokeStyle = 'rgb(12, 12, 12)';
context.lineWidth = 2.5;
context.fillStyle = 'white';
context.fillRect(0,0,700,700);
// context.fillStyle = 'rgb(12, 12, 12)';
// canvas.width = 700;
// canvas.height = 700; html에서 가로 세로 값 주면 js에서 정의할 필요 없음

function handleMove(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(drawing === false){
        context.beginPath();
        context.moveTo(x,y);
        // console.log(x,y);
        // console.log(drawing);
    }else{
        context.lineTo(x,y);
        context.stroke();
        // console.log(drawing);
    }
}

function startDrawing(){
    if(filling === false){
        drawing = true;
    }
    // console.log(drawing);
}

function stopDrawing(){
    drawing = false;
    // console.log(drawing);
}

function preventDef(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    // canvas.addEventListener("mouseenter", startDrawing);
    canvas.addEventListener("contextmenu", preventDef);
}


//===Change Color
function handleColorChange(event){
    let findColor = event.target.style.backgroundColor;
    context.strokeStyle = findColor;
    context.fillStyle = findColor;
}

if(color){
    Array.from(color).forEach(eachColor => 
        eachColor.addEventListener("click", handleColorChange));
}


//===Change Brush Size
function handleBrushChange(event){
    let valueNum = event.target.valueAsNumber;
    context.lineWidth = valueNum;
}
if(range){
    range.addEventListener("input", handleBrushChange)
}


//===Fill Mode
function handleFillMode(){
    if(filling === true){
        context.fillRect(0,0,700,700);
    }
}

canvas.addEventListener("click",handleFillMode);



//===Checked Fill Mode
function handleModeChange(){
    fillMode.classList.toggle("checked");
    if(fillMode.classList.contains("checked")){
        filling = true;
        fillMode.innerText = "fill";
    }else{
        filling = false;
        fillMode.innerText = "brush";
    }
    console.log(filling);
}

if(fillMode){
    fillMode.addEventListener("click", handleModeChange);
}


//===Save Canvas Image
//===Checked Save Mode
function handleSaveImg(){
    const image = canvas.toDataURL();
    const saveImg = document.createElement('a');
    saveImg.href = image;
    saveImg.download = "그림판";
    saveImg.click();
}

// function handleSaveClick(){
//     saveMode.classList.toggle("checked");
// }

if(saveMode){
    // saveMode.addEventListener("click", handleSaveClick);
    saveMode.addEventListener("click", handleSaveImg);
}



