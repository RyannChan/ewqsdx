<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff" active-text-color="#409EFF">
        <el-menu-item index="2" @click="quitFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/images/logo.png" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 左侧导航菜单 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#23262E" text-color="#fff" active-text-color="#409EFF" unique-opened router>
          <!-- 不包含子菜单的“一级菜单” -->
          <template v-for="item in menus">
            <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children"><i :class="item.icon"></i>首页</el-menu-item>
            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
                <!-- <span>{{ item.indexPath }}</span> -->
              </template>

              <!-- 循环渲染“二级菜单” -->
              <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key="subItem.indexPath"><i :class="subItem.icon"></i>{{ subItem.title }}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <!-- <el-main> Main.vue后台主页 </el-main> -->
        <el-main> <router-view></router-view> </el-main>

        <!-- 底部 footer 区域 -->
        <el-footer>© welcome to my project!</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getMenusAPI } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'my-layout',
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.getMenusListFn()
    // console.log(this.menus)
  },
  methods: {
    // 经验：在组件库中使用的无论是click，input等都是自定义的事件
    // 退出登陆
    quitFn() {
      console.log('quit successfully!')
      this.$confirm('即将退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('updateToken', '')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    async getMenusListFn() {
      const { data: res } = await getMenusAPI()
      console.log(res)
      this.menus = res.data
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
  // 侧边栏菜单的样式
  .el-aside {
    .el-submenu,
    .el-menu-item {
      width: 200px;
      user-select: none;
    }
  }
}
</style>
