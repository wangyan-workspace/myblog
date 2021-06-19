<template>
  <div
    class="contain"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <app-header></app-header>
    <main class="contain" background>
      <h1 style="color: rgba(64, 158, 255, 0.8)">发表文章</h1>
      <p style="color: rgba(64, 158, 255, 0.8)">
        标题：
        <el-input v-model="title" placeholder="请输入内容" style="width: 200px"></el-input>
      </p>
      <div
        style="
          float: left;
          margin: 10px 0 0 30px;
          color: rgba(64, 158, 255, 0.8);
        "
      >内容：</div>
      <textarea name="" id="" cols="165" rows="40" v-model="content"></textarea>
      <!-- <div id="editor">
        <editor ref="editorOne" v-model="content" @change="change"></editor>
      </div> -->
      <el-button type="primary" round @click="postBlog" class="el-icon-document">发表</el-button>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
// import Editor from '../components/Editor.vue'

export default {
  components: { AppHeader},
  data() {
    return {
      title: '',
      content: '',
      username: '',
      isLogin: false,
      loading: true
    }
  },
  created() {
    if (this.$store.state.loginUser) {
      this.username = this.$store.state.loginUser.username
      this.isLogin = !this.isLogin
    }
    this.nLoading()
  },
  methods: {
    nLoading() {
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    postBlog() {
      // this.$store.state.loginUser: 取出在vuex存储器里的用户信息
      let loginUser = this.$store.state.loginUser
      // 先判断出用户是否登录，登录成功之后才可以发表文章
      if (loginUser) {
        this.$http
          .post('/blog/post', {
            title: this.title,
            content: this.content,
            userId: loginUser.user_id
          })
          .then((res) => {
            let { state } = res.data
            if (state == 'success') {
              this.$message({
                message: '恭喜你，文章发表成功',
                type: 'success'
              })
              this.$router.push('/')
            } else {
              alert('发表文章失败！')
            }
          })
      } else {
        alert('你还没登录呢，快去登录...😤')
        this.$router.push('/login')
      }
    }
    // change(val) {
    //   console.log(val)
    // }
  }
}
</script>

<style scoped>
.contain {
  background: #fff;
  height: 1200rpx;
}
input {
  width: 150px;
  background: rgb(224, 205, 244);
  margin: 20px 0;
}
textarea {
  background: #fff;
  box-shadow: inset 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  margin-top: 10px;
  outline: none;
}
/* #editor {
  width:1010px;
  height: 400px;
  background: #fff;
  margin: 100px 225px;
  border: 0;
  margin-top: 10px;
  outline: none;
} */

</style>