<template>

    <div class="sys-container">
        <aside class="sys-aside">
            <el-menu default-active="/sys-management/account" :router="true"  @open="handleopen" @close="handleclose" theme="dark">
              <el-menu-item index="/sys-management/account">账号管理
             </el-menu-item>
              <el-submenu index="/sys-management/dict-theme">
                <template slot="title">字典管理</template>
                <el-menu-item index="/sys-management/dict-theme">主题
                </el-menu-item>
                  <el-menu-item index="/sys-management/dict-category">分类
                  </el-menu-item>
              </el-submenu>
              <el-menu-item index="/sys-management/system">分发系统
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
