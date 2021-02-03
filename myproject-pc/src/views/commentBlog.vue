<template>
  <div
    class="container"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <app-header></app-header>
    <main class="blog">
      <div class="blog-title">
        <h3>{{ blogInfo && blogInfo.title }}</h3>
        <span>{{ blogInfo && blogInfo.post_time }}</span>
      </div>
      <div class="blog-content">{{ blogInfo && blogInfo.content }}</div>
    </main>
    <footer class="discuss">
      <h1 style="color: rgba(64, 158, 255, 0.8)">发表评论</h1>
      <div
        style="
          float: left;
          color: rgba(64, 158, 255, 0.8);
          margin: 10px 0 0 50px;
        "
      >
        内容：
      </div>
      <textarea name="" id="" cols="140" rows="20" v-model="content"></textarea>
      <p style="margin-top: 30px">
        <el-button
          type="primary"
          round
          @click="postComment"
          class="el-icon-document"
          >发表</el-button
        >
      </p>
    </footer>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      content: '',
      username: '',
      isLogin: false,
      blogInfo: null,
      loading: true
    }
  },
  created() {
    if (this.$store.state.loginUser) {
      this.username = this.$store.state.loginUser.username
      this.isLogin = !this.isLogin
    }
    this.getBlogId()
    this.nLoading()
  },
  methods: {
    nLoading() {
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    getBlogId() {
      let blogId = this.$route.params.blogId
      this.$http
        .get('/blog/content', {
          params: {
            blogId: blogId
          }
        })
        .then((res) => {
          let { state, blogMessage } = res.data
          // console.log(blogMessage)
          if (state === 'success') {
            this.blogInfo = blogMessage
          }
        })
    },
    postComment() {
      // this.$store.state.loginUser: 取出在vuex存储器里的用户信息
      let loginUser = this.$store.state.loginUser
      if (loginUser) {
        this.$http
          .post('/blog/comment', {
            content: this.content,
            blog_id: this.blogInfo.blog_id,
            user_id: this.$store.state.loginUser.user_id
          })
          .then((res) => {
            let { state } = res.data
            if (state === 'success') {
              this.$message({ message: '评论成功', type: 'success' })
              this.$router.push('/blog/detail/' + this.blogInfo.blog_id)
            } else {
              this.$message({ message: '评论失败', type: 'error' })
            }
          })
      } else {
        this.$message({ message: '你还没登录呢，快去登录...😤', type: 'error' })
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.blog {
  margin: 0 auto;
  padding: 20px;
  background: rgba(242, 246, 252, 0.8);
  /* border: 1px solid #909399; */
  margin: 40px 50px;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.discuss {
  background: #fff;
  height: 1200rpx;
}
textarea {
  background: #fff;
  box-shadow: inset 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  outline: none;
  border: 0;
}
</style>