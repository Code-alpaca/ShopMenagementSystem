<template>
  <div class="content">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png">
      </div>
      <div class="login_form">
        <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-s-custom" v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock" v-model="loginForm.password" type="password" :show-password='true'>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // 老师的方法，用到了async await方法解构赋值
      // this.$refs.ruleForm.validate(async valid =>{
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('login', this.loginForm)
      //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      //   this.$message.success('登录成功')
      //   // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
      //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
      //   //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
      //   window.sessionStorage.setItem('token', res.data.token)
      //   // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
      //   this.$router.push('/home')
      // })

      // 本人方法，用promise对象的then方法取值
      this.$refs.ruleForm.validate(valid => {
        var that = this
        // 通过表单预验证
        if (valid) {
          this.$http.post('login', this.loginForm).then(function (res) {
            if (res.data.meta.status == 200) {
              that.$message.success('登录成功')
              // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
              //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
              //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
              window.sessionStorage.setItem('token', res.data.data.token)
              // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
              that.$router.push('/home')
            } else {
              that.$message.error(res.data.meta.msg)
            }
          }, function (err) {
            that.$message.error(err)
          })
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }

}
</script>
<style lang='less' scoped>
.content{
  background-color: rgb(23, 26, 25);
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: rgb(238, 245, 245);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .login_form{
    margin: 0 10%;
    margin-top: 25%;
  }
}
.logo{
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
