<template>
  <el-form-item prop='code' :rules='rules'>
    <el-button class="button-vcode" :loading='loading' :disabled="disabled" @click="handlerCode">{{button_text}}</el-button>
    <el-input v-model="code" placeholder="验证码" v-on:input='enterInput'></el-input>
  </el-form-item>
</template>
<script>
import { GetCode } from '@/api/account'

export default {
  name: 'App',
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      disabled: true,
      code: '',
      timer: null,
      button_text: '获取验证码',
      rules: [
        {
          required: true,
          message: '验证码不能为空',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 6,
          message: '请输入6位字符的验证码',
          trigger: 'change',
        },
      ],
    }
  },
  methods: {
    handlerCode() {
      const requestData = {
        username: this.username,
        module: 'register',
      }
      this.loading = true
      GetCode(requestData)
        .then((res) => {
          this.loading = false
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.countDown()
        })
        .catch((err) => {
          this.loading = false
        })
    },
    countDown() {
      let second = 10
      this.disabled = true
      this.button_text = `倒计时${second}秒` //初始化文本
      this.timer = setInterval(() => {
        second--
        this.button_text = `倒计时${second}秒`
        console.log(second)
        if (!second && this.timer) {
          clearInterval(this.timer)
          this.disabled = false
          this.button_text = '重新获取'
        }
      }, 1000)
    },
    enterInput() {
      this.$emit('update:value', this.code)
    },
  },
  watch: {
    username: {
      handler(newValue, oldValue) {
        this.disabled = newValue ? false : true
      },
    },
  },
}
</script>
<style scoped>
</style>