<template>
    <div class="">
        <el-card class="box-card" style="height: 800px;">
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

            <el-button-group style="display: block;margin: 5px 0;">
                <el-button type="primary" icon="plus" @click.native="userAdd"></el-button>
                <el-button type="danger" icon="delete" @click.native="userDeleteAll" :disabled="!deleteAll"></el-button>
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
                inline-template
                label="注册时间"
                width="150">
                <div>{{ row.registerTime }}</div>
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
                <div>{{ row.auth===0?'管理员':'录入人员' }}</div>
            </el-table-column>
            <el-table-column
                inline-template
                label="操作"
                width="145">
            <div style="text-align: center">
                <el-button type="primary" icon="edit" @click.native="editClick(row, $index)">
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
                <el-input v-model="formAlignRight.name"></el-input>
            </el-form-item>
            <el-form-item label="组织">
                <el-input v-model="formAlignRight.org_type"></el-input>
            </el-form-item>
            <el-form-item label="单位">
                <el-input v-model="formAlignRight.org"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="formAlignRight.desc"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="formAlignRight.auth">
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
                <el-button type="primary" @click.native="dialogConfirm">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { format } from '../../utils/util.js';

var timer = null;


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
            deleteAll: false,
            formAlignRight: {
                id: '',
                name: '',
                org_type: '',
                org: '',
                auth: '',
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
            auth: '',
            shouldUserAdd: true,
            curIndex: 1
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
        ids: function(val) { //更改批量删除状态
            this.deleteAll = val.length>1
        }
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
                this.accountList = response.data.accountList.map(row=>{
                    let parsedObj = {registerTime: row.register_time};
                    if(row.register_time)
                        parsedObj.registerTime = format(row.register_time,"yyyy-MM-dd hh:mm");
                    return Object.assign({},row,parsedObj);
                })
                this.totalSize = response.data.totalSize;

            })
        },
        addAccountToServer() {
            this.auth = ''; //给confirm按钮状态用的
            if(!this.formAlignRight.name) {
                this.$message('请输入用户名');
                return;
            }
            if(this.formAlignRight.auth===undefined) {
                this.$message('请选择权限');
                return;
            }
            this.dialogFormVisible = false;
            this.$http.post("/sysmgr/account/save",{
                name: this.formAlignRight.name,
                org_type: this.formAlignRight.org_type,
                org: this.formAlignRight.org,
                desc: this.formAlignRight.desc,
                auth: this.formAlignRight.auth
            })
            .then((response) => {
                console.log('account add success!')
                this.$notify({
                    title: '消息',
                    message: '添加 '+this.formAlignRight.name+' 用户成功',
                    type: 'success'
                });
                this.fetchServerData()
            }, (response) => {

            });
        },
        editAccountToServer() {
            this.dialogFormVisible = false;
            this.$http.post("sysmgr/account/save",{
                id: this.formAlignRight.id,
                auth: this.formAlignRight.auth,
                org: this.formAlignRight.org,
                org_type: this.formAlignRight.org_type,
                desc: this.formAlignRight.desc
            })
            .then((response) => {
                console.log('change authority success!')
                this.$notify({
                    title: '消息',
                    message: '更新用户信息成功',
                    type: 'success'
                });
                this.fetchServerData()
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
                this.fetchServerData()
            }, (response) => {

            })
        },
        handleMultipleSelectionChange(val) {

            this.ids = val.map(function(item) {
                return item.id
            })

            // var that = this;
            //
            // selectedArr = val.map(function(item) {
            //     return item.id;
            // })
            //
            //
            // val.forEach(function(item) {
            //     if(temp_selectedArr.indexOf(item.id)===-1) {
            //         temp_selectedArr.push(item.id);
            //     }
            // })
            //
            // for(var i=0,len=temp_selectedArr.length; i<len; i++) {
            //     if(selectedArr.indexOf(temp_selectedArr[i])===-1){
            //         if(!this.pageHasChange) {
            //             removeByValue(temp_selectedArr, temp_selectedArr[i])
            //         }
            //     }
            // }

            // console.log(temp_selectedArr)
            // this.ids = temp_selectedArr

            // no need to fix anymore, date: 2016-10-13 11:17:23
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
        editClick: function(row, index) {
            this.dialogTitle = '权限修改'
            this.dialogFormVisible = true;
            this.shouldUserAdd = false;
            this.curIndex = index;
            this.formAlignRight = {
                id: row.id,
                name: row.name,
                org_type: row.org_type,
                org: row.org,
                desc: row.desc,
                auth: row.auth
            }

            this.auth = row.auth; //给confirm按钮状态用
        },
        dialogConfirm: function() {
            // this.shouldUserAdd ? this.addAccountToServer() : this.editAuthorityToServer()
            var editAccount = {
                id: this.accountList[this.curIndex].id,
                name: this.accountList[this.curIndex].name,
                org_type: this.accountList[this.curIndex].org_type,
                org: this.accountList[this.curIndex].org,
                desc: this.accountList[this.curIndex].desc,
                auth: this.accountList[this.curIndex].auth
            };

            if(this.shouldUserAdd) { // 用户添加
                this.addAccountToServer();
            } else { // 用户编辑
                if ((editAccount.name===this.formAlignRight.name) &&
                    (editAccount.org_type===this.formAlignRight.org_type) &&
                    (editAccount.org===this.formAlignRight.org) &&
                    (editAccount.desc===this.formAlignRight.desc) &&
                    (editAccount.auth===this.formAlignRight.auth)) {
                        // 数据未变
                        this.$message({
                            type: 'info',
                            message: '数据未发生变更'
                        })
                        this.dialogFormVisible = false;
                        return;
                } else {
                    this.editAccountToServer();
                }
            }
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
            this.fetchServerData();
        }
    }
};
</script>

<style>

</style>
