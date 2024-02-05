<script lang="ts">
  import { SCMD, CCMD, DefaultConf, type IConf } from '../../main/shared'
  import CheckBox from './components/CheckBox.svelte'
  import ConfItem from './components/ConfItem.svelte'

  const {ipcRenderer} = window.electron

  let conf: IConf = DefaultConf
  ipcRenderer.on(SCMD.UConf, (_, v) => {
    conf = v
  })
  ipcRenderer.send(CCMD.RConf)
</script>

<div class="app">
  <div class="header">
    <span class="title">忍者秘籍</span>
    <button class="close" type="button" on:click={() => ipcRenderer.send(CCMD.XCloseHelpWindow)}>❌</button>
  </div>
  <div class="container">
    <ConfItem label="置顶">
      <CheckBox checked={conf.PinTop} on:change={e => ipcRenderer.send(CCMD.UPinTop, e.detail)} />
    </ConfItem>
    <ConfItem label="记住窗口大小">
      <CheckBox checked={conf.RemberSize} on:change={e => ipcRenderer.send(CCMD.URemberSize, e.detail)} />
    </ConfItem>
    <ConfItem label="记住窗口位置">
      <CheckBox checked={conf.RemberPosition} on:change={e => ipcRenderer.send(CCMD.URemberPosition, e.detail)} />
    </ConfItem>
    <ConfItem label="刷新页面">
      <button hidden on:click={() => ipcRenderer.send(CCMD.XRefresh)}></button>
    </ConfItem>
    <div class="pt-2 border-t-2 border-dashed">
      更多功能还在开发中...<br />
      按 F1 呼出/关闭 本秘籍 <br />
      若快捷键被占用，则输入指令 :help <br />
      按 alt + Z 显示/隐藏 本窗口 <br />
      当前版本所有快捷键均不能重新设置，后续版本将推出
    </div>
  </div>
</div>

<style lang="postcss">
  .app {
    border-radius: 10px;
    background: linear-gradient(165deg, white 0%, #fefefe 75%, #f0f0f0 100%);
    @apply box-border min-h-screen p-2 select-none;
  }
  .header {
    -webkit-app-region: drag;
    @apply flex justify-around items-center px-4;
    height: 60px;
    border-radius: 10px;
    background-image: linear-gradient(100deg, #d0edea 0%, #eaf3f2 74%);
  }
  .header .title {
    @apply flex-1 text-2xl text-center;
  }
  .header .close {
    -webkit-app-region: no-drag;
    cursor: pointer;
    @apply block w-8 h-8 rounded-full;
    background-image: linear-gradient(180deg, #c9e5e2 0%, #d6e1e0 95%);
  }
  .header .close {
    -webkit-app-region: no-drag;
    cursor: pointer;
    @apply block w-10 h-10 rounded-full transition-all hover:rotate-90;
    background-image: linear-gradient(180deg, #c9e5e2 0%, #d6e1e0 95%);
  }

  .container {
    @apply max-w-md mx-auto;
  }
</style>
