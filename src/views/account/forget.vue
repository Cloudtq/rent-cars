<template>
  <div class="user-container">
    <Back>
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4">登陆</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <Username :value.sync="form.username" />
        <PasswordVue :passwordConfirm='form.passwordConfirm' :value.sync="form.password" />
        <PasswordConfirm :password="form.password" :value.sync="form.passwordConfirm" />

        <Code :username="form.username" :value.sync="form.code" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1'

import Username from '@/components/account/username'
import PasswordVue from '@/components/account/password'
import PasswordConfirm from '@/components/account/passwordConfirm'
import Code from '@/components/code/'
import { Forget } from '@/api/account'

export default {
  name: 'Forget',
  components: {
    Username,
    Code,
    PasswordVue,
    PasswordConfirm,
  },
  data() {
    return {
      form: {
        username: '',
        code: '',
        password: '',
        passwordConfirm: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.forgetPwd()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    forgetPwd() {
      const requestData = {
        username: this.form.username,
        password: sha1(this.form.password),
        code: this.form.code,
      }
      this.$store.dispatch('account/forgetAction').then((res) => {
        this.$message({
          type: 'success',
          message: res.message,
        })
        this.$router
          .replace({
            name: 'Login',
          })
          .catch((err) => {})
      })
    },
  },
}
</script>
<style lang="scss"></style>