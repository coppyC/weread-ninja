<script lang="ts">

</script>

<div class="container">
  <div class="header">
    <span class="title">F1 菜单</span>
  </div>
  <div class="content">
    还在开发中...<br/>
    按 F1 呼出/关闭 本菜单 <br/>
    按 alt + Z 显示/隐藏 本窗口
  </div>
</div>

<style>
.container {
  border-radius: 10px;
  background: linear-gradient(135deg, white 0%, #fefefe 75%, #f0f0f0 100%);
  padding: 8px;
  min-height: 100vh;
  box-sizing: border-box;
}
.header {
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-radius: 10px;
  background-image: linear-gradient(100deg, #d0edea 0%, #eaf3f2 74%);
}
.header .title {
  font-size: 22px;
  text-align: center;
  flex: 1;
}

.content {
  max-width: 500px;
  margin: 8px auto;
}
</style>
