const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const color = document.querySelector(".input__color")
const tools = document.querySelectorAll(".button__tool")
const sizes = document.querySelectorAll(".button__size")
const clear = document.querySelector(".button__clear")

let brushSize = 20
let isDrawing = false
let activeTool = "brush"



color.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value
})

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isDrawing = true

    if (activeTool == "brush") {
        draw(clientX, clientY)
    }

    if (activeTool == "rubber") {
        erase(clientX, clientY)
    }
})

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isDrawing) {
        if (activeTool == "brush") {
            draw(clientX, clientY)
        }

        if (activeTool == "rubber") {
            erase(clientX, clientY)
        }
    }
})

window.addEventListener("mouseup", ({ clientX, clientY }) => {
    isDrawing = false
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    )
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    )
    ctx.fill()
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        activeTool = action
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data-size")

    sizes.forEach((tool) => tool.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
})

sizes.forEach((button) => {
    button.addEventListener("click", selectSize)
})

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
