<template>
  <div class="user-container">
    <Back />
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="开户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请选择开户银行"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="预留手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="button-vcode">获取验证码</button>
          <el-input v-model="form.name" placeholder="手机验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-block">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bankcard',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>
<style lang='scss'>
</style>