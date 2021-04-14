<template>
  <el-form-item id="password" prop='password' :rules='[{ validator: validatePassword, trigger: "change" }]'>
    <el-input type='password' v-model="password" :placeholder="placeholder" v-on:input="enterInput"></el-input>
  </el-form-item>

</template>
<script>
import { validate_password } from '@/utils/validate'

export default {
  name: 'Password',
  props: {
    placeholder: {
      type: String,
      default: '新密码',
    },
    passwordConfirm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      password: '',
    }
  },
  methods: {
    validatePassword(rule, val, callback) {
      //   if (!this.passwordConfirm || this.passwordConfirm == '') {
      //     callback()
      //   }
      if (!this.password || this.password == '') {
        return callback(new Error('密码不能为空'))
      } else if (!validate_password(this.password)) {
        return callback(new Error('密码为6~20位的英文和数字组合'))
      } else if (
        this.passwordConfirm &&
        this.password != this.passwordConfirm
      ) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    enterInput() {
      const valiStatus = validate_password(this.password)
      const value = valiStatus ? this.password : ''
      this.$emit('update:value', value)
    },
  },
  watch: {
    passwordConfirm: {
      handler(newValue, oldValue) {
        if (newValue === this.password) {
          const errorDom = document
            .getElementById('password')
            .querySelector('.el-form-item__error')
          if (errorDom) {
            errorDom.style.display = 'none'
          }
        }
      },
    },
  },
}
</script>
<style scoped>
</style>