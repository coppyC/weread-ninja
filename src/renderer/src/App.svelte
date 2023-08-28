<script lang="ts">

</script>

<div class="app">
  <div class="header">
    <span class="title">忍者秘籍</span>
  </div>
  <div class="content">
    还在开发中...<br/>
    按 F1 呼出/关闭 本菜单 <br/>
    按 alt + Z 显示/隐藏 本窗口
  </div>
</div>

<style>
.app {
  border-radius: 10px;
  background: linear-gradient(165deg, white 0%, #fefefe 75%, #f0f0f0 100%);
  @apply box-border min-h-screen p-2;
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

.content {
  max-width: 500px;
  margin: 8px auto;
}
</style>
