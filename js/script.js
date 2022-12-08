const canvas = document.querySelector("canvas"),
    sizeSlider = document.querySelector("#size-slider"),
    toolBtn = document.querySelectorAll(".tool");
// clearBtn = document.querySelector(".clear-canvas");




window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})
let ctx = canvas.getContext("2d"),
    isDrawing = false,
    selectedTool = "brush",
    prevMouseX,
    prevMouseY,
    snapShot;

const startDraw = e => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    // console.log(prevMouseX);
    ctx.beginPath();
    ctx.lineWidth = sizeSlider.value;
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(snapShot);
}
const drawRectangel = e => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    style.background = "black"
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
            break
        default:
            break;
    }


}

toolBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id;
    })
})

const stopDraw = () => {
    isDrawing = false
}

// clearBtn.addEventListener("click", () => {
//     ctx.clearRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
// })
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", stopDraw)