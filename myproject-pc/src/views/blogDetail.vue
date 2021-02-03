<template>
  <div class="container" v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <app-header></app-header>
    <div class="blog">
      <div class="main" style="background: rgba(242,246,252,1)">
        <div class="blog-title">
          <h3>{{ blog && blog.title }}</h3>
          <span style="font-size: 10px; color: #909399">{{ blog && blog.post_time }}</span>
        </div>
        <div class="blog-content">{{ blog && blog.content }}</div>
      </div>
      <div class="comments">
        <h2 style="margin: 20px 0; color: #409eff">评论</h2>
        <div class="comment" v-for="item in comments" :key="item.comm_id">
          <div class="comment-content" style="font-weight: 800">
            {{ item.comm_content }}
          </div>
          <div class="comment-info">
            <span class="userinfo" style="color: #303133">{{
              item.username
            }}</span>
            <span class="post-time">{{ item.comm_post_time }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/" style="color: #409eff" class="el-icon-menu"
      >回到首页</router-link
    >
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      blog: null,
      comments: '',
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
    // 获取路由上传递的参数
    // console.log(this.$route.params)
    this.getBlogDetail()
    this.nLoading();
  },
  methods: {
    nLoading() {
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    getBlogDetail() {
      let blogId = this.$route.params.blogId
      this.$http
        .get('/blog/detail', {
          params: {
            blogId: blogId
          }
        })
        .then((res) => {
          let { state, blogInfo } = res.data
          if (state === 'success') {
            this.blog = blogInfo
            // console.log(blogInfo)
            this.comments = this.blog.comments
          }
        })
      // .catch((err) => {
      //   //   alert('请求未授权-catch!', err)
      //   this.$router.push('/login')
      // })
    }
  }
}
</script>

<style scoped>
.blog {
  margin: 20px auto;
  padding: 20px;
  background: #fff;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.comments {
  background: #fff;
}
.comment {
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.comment-info {
  float: right;
}
.userinfo {
  margin-right: 30px;
}
.post-time {
  font-size: 10px;
  color: #909399;
}
</style>
