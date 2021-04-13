<template>
  <el-form-item id='passwordConfirm' prop='passwordConfirm' :rules='[{ validator: validatePassword, trigger: "change" }]'>
    <el-input type='password' v-model="passwordConfirm" :placeholder="placeholder" v-on:input="enterInput"></el-input>
  </el-form-item>

</template>
<script>
import { validate_password } from '@/utils/validate'

export default {
  name: 'PasswordConfirm',
  props: {
    placeholder: {
      type: String,
      default: '确认密码',
    },
    password: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      passwordConfirm: '',
    }
  },
  methods: {
    validatePassword(rule, val, callback) {
      //   if (!this.password || this.password == '') {
      //     callback()
      //   }

      if (!this.passwordConfirm || this.passwordConfirm == '') {
        return callback(new Error('密码不能为空'))
      } else if (!validate_password(this.passwordConfirm)) {
        return callback(new Error('密码为6~20位的英文和数字组合'))
      } else if (this.password && this.passwordConfirm != this.password) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    enterInput() {
      const valiStatus = validate_password(this.passwordConfirm)
      const value = valiStatus ? this.passwordConfirm : ''
      this.$emit('update:value', value)
    },
  },
  watch: {
    password: {
      handler(newValue, oldValue) {
        if (newValue === this.passwordConfirm) {
          const errorDom = document
            .getElementById('passwordConfirm')
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