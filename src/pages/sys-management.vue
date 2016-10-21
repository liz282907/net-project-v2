<template>

    <div class="sys-container">
        <aside class="sys-aside">
            <el-menu default-active="/app/sys-management/account" :router="true" theme="dark">
              <el-menu-item index="/app/sys-management/account" id="accountItem">
                账号管理
             </el-menu-item>
              <!-- <el-submenu index="2">
                <template slot="title">字典管理</template>
                <el-menu-item index="/sys-management/dict-theme">
                  主题
                </el-menu-item>
                  <el-menu-item index="/sys-management/dict-category">
                    分类
                  </el-menu-item>
              </el-submenu> -->
              <el-menu-item index="/app/sys-management/dict-theme">
                主题管理
              </el-menu-item>
              <el-menu-item index="/app/sys-management/dict-category">
                分类管理
              </el-menu-item>
              <el-menu-item index="/app/sys-management/system">
                分发系统
              </el-menu-item>
            </el-menu>
        </aside>
        <div class="sys-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
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
    },
    created(){

    },
    mounted() {
        $("#accountItem").click()
    }
};
</script>

<style>

</style>
