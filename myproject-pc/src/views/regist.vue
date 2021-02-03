<template>
  <div class="login-container">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">用户注册</h2>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          @blur="checkUser"
          v-model="form.nickname"
          placeholder="请输入昵称"
          >></el-input
        >
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码">></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // //校验成功，发送异步请求
          this.$http
            .post('/user/regist', {
              username: this.form.username,
              password: this.form.password,
              nickname: this.form.nickname
            })
            .then((res) => {
              let { state } = res.data

              if (state === 'success') {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push('/login')
              } else {
                this.$message.error('请重新注册!')
              }
            })
        } else {
          return false
        }
      })
    },
    checkUser() {
      this.$http
        .get('/user/checkUser', {
          // 向路由/checkUser传递的参数（在路由后面的键值对）
          params: {
            username: this.username
          }
        })
        .then(function (res) {
          let spanInfo = document.getElementById('info')
          let { state } = res.data
          if (state === 'success') {
            spanInfo.innerHTML = 'OK'
          } else {
            spanInfo.innerHTML = '用户名已存在'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 50px;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-title {
  text-align: center;
  color: #303133;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/reg_bg.jpg');
  overflow: hidden;
  background-size: cover;
}
.el-button {
  margin-left: 60px;
}
</style>