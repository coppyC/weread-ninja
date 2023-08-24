/// <reference types="vite/client" />
import ninjaCode from './weread-ninja.css?raw'

document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style")
    style.innerText = ninjaCode
    document.head.appendChild(style)
})
