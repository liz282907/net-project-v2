<template>
    <div class="">
        <el-card class="box-card">
            <el-input
                style="width: 300px; margin-bottom: 10px;"
                placeholder="请输入用户名"
                icon="search"
                v-model="search_input">
            </el-input>

            权限查看
            <el-radio-group v-model="option_authority" @change="authorityChange">
                <el-radio :label="-1">所有</el-radio>
                <el-radio :label="1">录入人员</el-radio>
                <el-radio :label="0">管理员</el-radio>
            </el-radio-group>

            <el-button-group style="display: block;margin-top: 5px;">
                <el-button type="primary" icon="plus" @click.native="userAdd"></el-button>
                <el-button type="danger" icon="delete" @click.native="userDeleteAll"></el-button>
            </el-button-group>

            <el-table
                :data="accountList"
                selection-mode="multiple"
                border
                height="600"
                stripe
                style="text-align: left"
                @selectionchange="handleMultipleSelectionChange">
            <el-table-column
                type="selection"
                width="50">
            </el-table-column>
            <el-table-column
                inline-template
                label="ID"
                width="80">
                <div>{{ row.id }}</div>
            </el-table-column>
            <el-table-column
                property="name"
                sortable
                label="用户名"
                width="100">
            </el-table-column>
            <el-table-column
                property="register_date"
                label="注册时间"
                width="130">
            </el-table-column>
            <el-table-column
                property="org_type"
                label="组织类型"
                width="100">
            </el-table-column>
            <el-table-column
                property="org"
                label="单位"
                width="100">
            </el-table-column>
            <el-table-column
                property="desc"
                label="职位"
                width="100">
            </el-table-column>
            <el-table-column
                inline-template
                label="权限"
                width="100">
                <div>{{ row.authority===0?'管理员':'录入人员' }}</div>
            </el-table-column>
            <el-table-column
                inline-template
                label="操作"
                width="145">
            <div style="text-align: center">
                <el-button type="primary" icon="edit" @click.native="editClick(row)">
                </el-button>
                <el-button type="danger" icon="delete" @click.native="userDeleteSingle(row.id, row.name)"></el-button>
            </div>
                </el-table-column>
            </el-table>

            <div class="block" style="text-align: right;margin-top: 10px;">
                <el-pagination
                    @sizechange="handleSizeChange"
                    @currentchange="handleCurrentChange"
                    :current-page="1"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="totalSize*pageSize">
                </el-pagination>
            </div>

        </el-card>

        <el-dialog :title="dialogTitle" v-model="dialogFormVisible">
            <el-form :model="formAlignRight" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="formAlignRight.name" :disabled="!shouldUserAdd"></el-input>
            </el-form-item>
            <el-form-item label="组织">
                <el-input v-model="formAlignRight.org_type" :disabled="!shouldUserAdd"></el-input>
            </el-form-item>
            <el-form-item label="单位">
                <el-input v-model="formAlignRight.org" :disabled="!shouldUserAdd"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="formAlignRight.desc" :disabled="!shouldUserAdd"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="formAlignRight.authority">
                    <el-option
                        v-for="item in authorityList"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogCancel">取 消</el-button>
                <el-button type="primary" @click.native="dialogConfirm" :disabled="formAlignRight.authority===authority">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {removeByValue} from "../../utils/util.js"

var timer = null;
var temp_selectedArr = [];



export default {
    data() {
        return {
            search_input: '',
            option_authority: -1,
            id: 1,
            ids: [],
            accountList: [],
            totalSize: 20,
            pageIndex: 1,
            pageSize: 20,
            dialogFormVisible: false,
            dialogTitle: 'test',
            formAlignRight: {
                id: '',
                name: '',
                org_type: '',
                org: '',
                authority: '',
                desc: ''
            },
            authorityList: [
              {
                name: '录入人员',
                value: 1
              },
              {
                name: '管理员',
                value: 0
              }
            ],
            authority: '',
            shouldUserAdd: true,
            selectedItemList: []
        }
    },
    components: {
    },
    mounted() {
        this.fetchServerData()
    },
    watch: {
        search_input: function() { //搜索框请求数据
            var that = this;
            clearTimeout(timer)
            timer = setTimeout(function() { //延时请求
                that.pageSize = 99999;
                that.fetchServerData()
            }, 500)
        },
        // ids: function(val) {
        //     this.saveSelectedItem()
        // }
    },
    methods: {
        fetchData(callback,params={}){
            let defaultParams = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                name: this.search_input,
                auth: this.option_authority
            };
            let data = Object.assign({},defaultParams,params);
            this.$http.get("/sysmgr/account/query",
                {
                    params:data
                })
            .then(callback,(err)=>{
              console.log("请求服务器失败");
            });
        },
        fetchServerData() {
            this.accountList = [];
            this.fetchData(function(response) {
                // console.log(response)
                // this.accountList = response.json().accountList;
                this.accountList = response.data.accountList;
                this.totalSize = response.data.totalSize;

                var that = this;
                setTimeout(function() {
                    that.keepSelectedItem()
                },0)
            })
        },
        addAccountToServer() {
            this.authority = ''; //给confirm按钮状态用的
            if(!this.formAlignRight.name) {
                this.$message('请输入用户名');
                return;
            }
            if(!this.formAlignRight.authority) {
                this.$message('请选择权限');
                return;
            }
            this.dialogFormVisible = false;
            this.$http.post("/sysmgr/account/save",{
                name: this.formAlignRight.name,
                org_type: this.formAlignRight.organization_type,
                org: this.formAlignRight.organization,
                desc: this.formAlignRight.desc,
                auth: this.formAlignRight.authority
            })
            .then((response) => {
                console.log('account add success!')
                this.$notify({
                    title: '消息',
                    message: '添加 '+this.formAlignRight.name+' 用户成功',
                    type: 'success'
                })
            }, (response) => {

            });
        },
        editAuthorityToServer() {
            this.dialogFormVisible = false;
            this.$http.post("sysmgr/account/save",{
                id: this.formAlignRight.id,
                auth: this.formAlignRight.authority
            })
            .then((response) => {
                console.log('change authority success!')
                this.$notify({
                    title: '消息',
                    message: '更新权限成功',
                    type: 'success'
                })
            }, (response) => {

            })
        },
        deleteAccountFromServer() {
            this.$http.post("/sysmgr/account/delete", {
                    ids: this.ids
            })
            .then((response) => {
                console.log('delete account success')
                this.$notify({
                    title: '消息',
                    message: '删除成功',
                    type: 'success'
                })
            }, (response) => {

            })
        },
        handleMultipleSelectionChange(val) {
            var that = this;


            val.forEach(function(item) {
                if(temp_selectedArr.indexOf(item.id)===-1) {
                    temp_selectedArr.push(item.id);
                }
            })

            this.ids = temp_selectedArr


            // bug to fix
            // selected==false时，需要清空ids里面的id

        },
        authorityChange: function(authority) {
            this.fetchServerData()
        },
        userAdd: function() {
            this.dialogTitle = '新增用户'
            this.dialogFormVisible = true;
            this.shouldUserAdd = true;
            this.formAlignRight = {}
        },
        userDeleteAll: function() {
            if(!this.ids.length) {
                this.$alert('请选择至少一个用户');
                return;
            }
            this.$confirm('系统将删除多个账户，是否继续？','提示', {
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'info',
                    message: '正在删除'
                });
                // 请求服务器
                this.deleteAccountFromServer();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        userDeleteSingle: function(id, name) {
            this.ids = [id];
            this.$confirm('系统将删除 '+name+' 用户信息，是否继续？','提示', {
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'info',
                    message: '正在删除'
                });
                // 请求服务器
                this.deleteAccountFromServer();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        editClick: function(row) {
            this.dialogTitle = '权限修改'
            this.dialogFormVisible = true;
            this.shouldUserAdd = false;

            this.formAlignRight = {
                id: row.id,
                name: row.name,
                organization_type: row.organization_type,
                organization: row.organization,
                desc: row.desc,
                authority: row.authority
            }

            this.authority = row.authority; //给confirm按钮状态用
        },
        dialogConfirm: function() {
            this.shouldUserAdd ? this.addAccountToServer() : this.editAuthorityToServer()
        },
        dialogCancel: function() {
            this.dialogFormVisible = false;
            this.$message({
                type: 'info',
                message: '已取消操作'
            })
        },
        keepSelectedItem: function() {
            let cardElement = this.$children.filter(child=>{
                return child.$el.className.indexOf("el-card")!==-1
            })[0];
            let selectedArr = cardElement.$children.filter(child=>{
                return child.$el.className.indexOf("el-table")!==-1
            })[0];

            var that = this;

            selectedArr.tableData.forEach(item => {
                if(that.ids.indexOf(item.id)!==-1){
                    item.$selected = true;
                }
            });
        },
        handleSizeChange: function(index) {
            console.log(index+'sizeChange')
        },
        handleCurrentChange: function(index) {
            this.pageIndex = index;
            this.fetchServerData()
        }
    }
};
</script>

<style>

</style>
