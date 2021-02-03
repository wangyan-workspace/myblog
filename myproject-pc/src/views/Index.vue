<template>
  <div
    class="container"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <app-header></app-header>
    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blogId" style="overflow: hidden; position: relative;">
        <h3 class="blog-title">
          <!-- <a href="/blog/detail/">{{ item.title }}</a> -->
          <router-link
            :to="{ path: '/blog/detail/' + item.blog_id }"
            style="color: #000"
            >{{ item.title }}</router-link
          >
        </h3>
        <p class="blog-content" style="color: #000">{{ item.content }}</p>
        <p class="post-time" style="font-size: 10px; color: #909399; float: left">{{ item.post_time }}</p>
        <p class="comment" style="position: absolute; bottom: 40px ;right: 20px">
          <router-link
            :to="{ path: '/blog/content/' + item.blog_id }"
            style="color: #409eff; font-weight: 800"
            class="el-icon-tickets"
            >评论一下</router-link
          >
          <!-- <router-link to="/commentBlog">评论一下</router-link> -->
        </p>
      </div>
    </div>
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
    <!-- <button @click="backtop">回到顶部</button> -->
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
      blogList: [],
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
    this.getData()
    // this.nLoading()
  },
  methods: {
    getData() {
      this.$http.get('/blog/list').then((res) => {
        let { state } = res.data
        if (state === 'auth-fail') {
          alert('请求未授权-then!')
        } else if (state === 'success') {
          let { blogs } = res.data
          this.blogList = blogs
          // console.log(this.blogList)
        }
      })
      // .catch((err) => {
      // //   alert('请求未授权-catch!', err)
      // // 跳转到登录页面
      //   this.$router.push('/login')
      // })
    },
    
    nLoading() {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
    // backtop(){
    //   target.scrollIntoView();
    // }
  }
}
</script>

<style scoped>
.container {
  background: #dedede;
}
.blog-list {
  width: 815px;
  margin: 20px auto;
  background: #f2f6fc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.blog {
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;
  opacity: 0.75;
  margin: 20px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}

.comment {
  float: right;
}
</style>
