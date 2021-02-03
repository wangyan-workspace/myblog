<template>
  <div class="login-container">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">博客系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // username: '',
      // password: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 5,
            max: 15,
            message: '账号长度在 5 到 15 个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // //校验成功，发送异步请求
            this.$http
              .post('/user/login', {
                username: this.form.username,
                password: this.form.password
              })
              .then((res) => {
                // console.log(res.data) // {status: "success", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…Dg3fQ.2WXY2QJY3POqrgq12py9BARS9CmVaZ0hr3jbr30ECcg"}
                let { state, token, user } = res.data
                if (state === 'success') {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  // console.log('登陆成功')
                  // 登陆成功,跳转到路由
                  // 存登录用户信息  this.$store.commit调用vuex的同步的方法
                  this.$store.commit('storeLoginUser', user)
                  // 存储token
                  // 调用vuex里的store里的方法  this.$store.dispatch调用vuex的异步的方法
                  this.$store.dispatch('setToken', token)
                  // 跳转到首页的路由
                  this.$router.push('/')
                } else {
                  // 登录失败
                  alert('用户名或密码不正确！')
                }
              })
        } else {
          return false
        }
      })
    }
  },

}
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 50px;
  border-radius: 20px;
}
.login-title {
  text-align: center;
  color: #303133;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/b3.jpg');
  overflow: hidden;
}
.el-button {
  margin-left: 60px;
}
</style>

