<template>
  <section class="app-main">
    <div class="assets-container">
      <div class="assets-text">
        <div class="assets-bg">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 0;
  width: 100%;
  position: relative;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
.app-main {
  padding: 20px 20px;

  .assets-container {
    border-radius: 4px;

    .assets-text {
      height: calc(100vh - 120px);
      overflow-x: hidden;
      overflow-y: auto;

      .assets-bg {
        background: #fff;
        border-radius: 4px;

        .assets-scroll {
          border: 1px solid #dbdcdc;
          border-radius: 4px;
          padding: 0 20px 15px;
          min-height: calc(100vh - 130px);
        }
      }
    }
  }

  .assets-text::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px; */
    background: #f2f2f2;
  }
}
</style>
