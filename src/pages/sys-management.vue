<template>

    <div class="sys-container">
        <aside class="sys-aside">
            <el-menu default-active="2" :router="true"  @open="handleopen" @close="handleclose" theme="dark">
              <el-menu-item index="1">
                    <router-link to="/sys-management/account">账号管理</router-link>
             </el-menu-item>
              <el-submenu index="2">
                <template slot="title">字典管理</template>
                <el-menu-item index="2-1">
                    <router-link to="/sys-management/dict-theme">主题</router-link>
                </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/sys-management/dict-category">分类</router-link>
                  </el-menu-item>
              </el-submenu>

              <el-menu-item index="3">
                <router-link to="/sys-management/system">分发系统</router-link>
              </el-menu-item>
            </el-menu>
        </aside>
        <div class="sys-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    methods:{
        handleopen(index,indexPath){
            console.log("index",index);
            console.log("indexPath",indexPath);
        },
        handleclose(index,indexPath){
            console.log("index",index);
            console.log("indexPath",indexPath);
        }
    }
};
</script>

<style>

</style>
