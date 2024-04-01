/// <reference types="vite/client" />
import ninjaCSS from './weread-ninja.css?raw'

requestAnimationFrame(function ninjaSneakIn() {
  if (!document.head) return void requestAnimationFrame(ninjaSneakIn)
  
  const style = document.createElement('style')
  style.innerText = ninjaCSS
  document.head.appendChild(style)
  
  const dragBlock = document.createElement('div')
  dragBlock.id = "ninja-DragQuicklyArea"
  document.body.appendChild(dragBlock)
  document.addEventListener("keydown", e => {
    if (e.key == "F2") {
      e.preventDefault()
      dragBlock.classList.add("ninja-DragQuickly")
    }
  })
  document.addEventListener("keyup", e => {
    if (e.key == "F2") {
      e.preventDefault()
      dragBlock.classList.remove("ninja-DragQuickly")
    }
  })

  console.log("%c微读忍者，启动！", "color:#c82330;font-weight:bold")
})
