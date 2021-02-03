<template>
  <div v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <app-header></app-header>
    <img src="../assets/about.jpeg" alt="" />
    <el-backtop :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  components:{
    AppHeader
  },
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.nLoading()
  },
  methods: {
    nLoading() {
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>