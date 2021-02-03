<template>
  <header>
    <div class="title el-icon-user-solid" style="font-weight: 800">
      MyBlog
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
    <el-button @click="getNowTime" type="primary" plain class="el-icon-time"
      >当前时间</el-button
    >
    <el-button
      @click="goPostBlog"
      type="primary"
      plain
      class="el-icon-edit-outline"
      >发表文章</el-button
    >
    <el-button
      @click="aboutOur"
      type="primary"
      plain
      class="el-icon-s-promotion"
      >关于我们</el-button
    >
    <div class="login-box">
      <span v-show="isLogin">{{ username }}</span>
      <span v-show="!isLogin">
        <router-link style="color: #409eff" to="/login" class="el-icon-user"
          >登录</router-link
        >
        /
        <router-link style="color: #67c23a" to="/regist">注册</router-link>
      </span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isLogin: false,
    }
  },
  created() {
    if (this.$store.state.loginUser) {
      this.username = this.$store.state.loginUser.username
      this.isLogin = !this.isLogin
    }
  },
  methods:{
    goPostBlog() {
      this.$router.push('/blog/post')
    },
    getNowTime() {
      this.$router.push('/nowTime')
    },
    aboutOur() {
      this.$router.push('/aboutOur')
    },
  }
}
</script>