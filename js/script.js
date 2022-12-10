const canvas = document.querySelector("canvas"),
    sizeSlider = document.querySelector("#size-slider"),
    toolBtn = document.querySelectorAll(".tool"),
    colorBtn = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvasBtn = document.querySelector(".clear-canvas"),
    saveCanvasBtn = document.querySelector(".save-canvas");



const fillColor = document.querySelector("#fill-color");
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = selectedColor
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground()
})



let ctx = canvas.getContext("2d"),
    isDrawing = false,
    selectedTool = "brush",
    prevMouseX,
    prevMouseY,
    selectedColor,
    snapShot;

const startDraw = e => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = sizeSlider.value;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(snapShot);

}

const drawRectangel = e => {
    fillColor.checked ?
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) :
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawCircle = e => {
    ctx.beginPath();
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangel = e => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    ctx.stroke()
    fillColor.checked ? ctx.fill() : ctx.stroke();
}


const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapShot, 0, 0)
    switch (selectedTool) {

        case "brush":
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        case "rectangel":
            drawRectangel(e);
            break;
        case "circle":
            drawCircle(e);
            // console.log(selectedTool);
            break;
        case "triangle":
            drawTriangel(e);
            break;
        case "eraser":
            ctx.strokeStyle = "#fff"
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        default:
            break;
    }


}

toolBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id;
        console.log(selectedTool);
    })
})
colorBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        document.querySelector(".options .selected").classList.remove("selected")
        btn.classList.add("selected")
        const colBtn = window.getComputedStyle(btn).getPropertyValue("background-color");
        selectedColor = colBtn;
        console.log(btn);

    })
})

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})

clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCanvasBackground()

})


saveCanvasBtn.addEventListener("click", () => {
    const link = document.createElement('a')
    link.download = `Aliy's|Paint ${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()

})


const stopDraw = () => {
    isDrawing = false
}

// console.log(selectedTool);
// clearBtn.addEventListener("click", () => {
//     ctx.clearRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
// })
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", stopDraw)