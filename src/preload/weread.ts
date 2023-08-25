/// <reference types="vite/client" />
import { ipcRenderer } from 'electron'
import ninjaCSS from './weread-ninja.css?raw'

requestAnimationFrame(function ninjaSneakIn() {
  if (!document.head) return void requestAnimationFrame(ninjaSneakIn)
  const style = document.createElement('style')
  style.innerText = ninjaCSS
  document.head.appendChild(style)
  console.log("%c微读忍者，启动！", "color:#c82330;font-weight:bold")
})

document.addEventListener('keydown', (ev) => {
  if (ev.key == 'F1') {
    ipcRenderer.send('Helper:Toggle')
  }
})
