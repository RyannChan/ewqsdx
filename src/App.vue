<template>
  <!-- <div>App 根组件</div> -->
  <router-view></router-view>
</template>

<script>
import { registerAPI } from './api'
export default {
  name: 'App',
  created() {
    this.registerAPI()
  },
  methods: {
    async registerAPI() {
      const res = await registerAPI()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped></style>
