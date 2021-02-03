<template>
  <div class="container" v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <app-header></app-header>
    <el-calendar v-model="value"> </el-calendar>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  components: { AppHeader },
  data() {
    return { 
      value: new Date() ,
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