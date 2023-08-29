<script lang="ts">
  import CheckBox from './components/CheckBox.svelte'
  import ConfItem from './components/ConfItem.svelte'

  const {ipcRenderer} = window.electron

  let conf = {
    PinTop: false,
    RemberSize: false
  }
  ipcRenderer.on("Conf:update", (_, v) => {
    conf = v
  })
  ipcRenderer.send("Conf:get")
</script>

<div class="app">
  <div class="header">
    <span class="title">忍者秘籍</span>
  </div>
  <div class="container">
    <ConfItem label="置顶">
      <CheckBox checked={conf.PinTop} on:change={e => ipcRenderer.send("Conf:PinTop", e.detail)} />
    </ConfItem>
    <ConfItem label="记住窗口大小">
      <CheckBox checked={conf.RemberSize} on:change={e => ipcRenderer.send("Conf:RemberSize", e.detail)} />
    </ConfItem>
    <div class="pt-2 border-t-2 border-dashed">
      更多功能还在开发中...<br />
      按 F1 呼出/关闭 本秘籍 <br />
      按 alt + Z 显示/隐藏 本窗口
    </div>
  </div>
</div>

<style>
  .app {
    border-radius: 10px;
    background: linear-gradient(165deg, white 0%, #fefefe 75%, #f0f0f0 100%);
    @apply box-border min-h-screen p-2 select-none;
  }
  .header {
    -webkit-app-region: drag;
    @apply flex justify-around items-center;
    height: 60px;
    border-radius: 10px;
    background-image: linear-gradient(100deg, #d0edea 0%, #eaf3f2 74%);
  }
  .header .title {
    @apply flex-1 text-2xl text-center;
  }

  .container {
    @apply max-w-md mx-auto;
  }
</style>
