<template>

    <div class="">
        <el-card class="box-card">
            <el-button type="primary" icon="plus" @click.native="userAdd" style="margin-bottom: 10px"></el-button>
            <el-table
                :data="systemList"
                border
                style="width: 100%">
                <el-table-column
                    property="id"
                    label="ID"
                    width="50">
                </el-table-column>
                <el-table-column
                    property="name"
                    label="名称"
                    width="130">
                </el-table-column>
                <el-table-column
                    property="abbr"
                    label="简称"
                    width="80">
                </el-table-column>
                <el-table-column
                    property="url"
                    label="URL"
                    width="400">
                </el-table-column>
                <el-table-column
                    inline-template
                    label="操作"
                    width="150">
                    <div style="text-align: center">
                        <el-button type="primary" icon="edit" @click.native="editSys(row)">
                        </el-button>
                        <el-button type="danger" icon="delete" @click.native="deleteSys(row.id)"></el-button>
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
            <el-form label-width="80px">
            <el-form-item label="系统名称">
                <el-input v-model="input_name"></el-input>
            </el-form-item>
            <el-form-item label="简称">
                <el-input v-model="input_abbr"></el-input>
            </el-form-item>
            <el-form-item label="URL">
                <el-input v-model="input_url"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
              <el-button @click.native="dialogCancel">取 消</el-button>
              <el-button type="primary" @click.native="dialogConfirm" :disabled="confirm_button">确 定</el-button>
          </span>
        </el-dialog>
    </div>

</template>

<script>

export default {
    data() {
        return {
            systemList: [],
            pageIndex: 1,
            pageSize: 10,
            totalSize: 20,
            dialogTitle: "系统编辑",
            formAlignRight: {
                id: '',
                name: '',
                abbr: '',
                url: ''
            },
            dialogFormVisible: false,
            shouldSysAdd: false,
            name: '',
            abbr: '',
            url: '',
            input_name: '',
            input_abbr: '',
            input_url: '',
            confirm_button: true
        }
    },
    components: {
    },
    watch: {
        input_name: function(val) {
            this.confirm_button = (!(val===this.name)) ? false : true
            if(this.input_url!==this.url) this.confirm_button = false;
            if(this.input_abbr!==this.abbr) this.confirm_button = false;
        },
        input_url: function(val) {
            this.confirm_button = (!(val===this.url)) ? false : true
            if(this.input_name!==this.name) this.confirm_button = false;
            if(this.input_abbr!==this.abbr) this.confirm_button = false;
        },
        input_abbr: function(val) {
            this.confirm_button = (!(val===this.abbr)) ? false : true
            if(this.input_url!==this.url) this.confirm_button = false;
            if(this.input_name!==this.name) this.confirm_button = false;
        }
    },
    methods: {
        fetchData(callback,params={}){
            let defaultParams = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            };
            let data = Object.assign({},defaultParams,params);
            this.$http.get("/sysmgr/distruibute/query",
                {
                    params:data
                })
            .then(callback,(err)=>{
              console.log("请求服务器失败");
            });
        },
        fetchServerData() {
            this.systemList = [];
            this.fetchData(function(response) {
                // console.log(response)
                // this.accountList = response.json().accountList;
                this.systemList = response.data.systemList;
                this.totalSize = response.data.totalSize;
            })
        },
        editSys: function(row) {
            this.dialogTitle = "系统编辑";
            this.dialogFormVisible = true;
            this.shouldUserAdd = false;

            this.id = row.id;
            this.input_name = row.name;
            this.input_abbr = row.abbr;
            this.input_url = row.url;

            this.name = row.name;
            this.abbr = row.abbr;
            this.url = row.url;
        },
        deleteSys: function(id) {
            this.$confirm('系统将删除 '+this.name+' 系统，是否继续？','提示', {
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'info',
                    message: '正在删除'
                });
                // 请求服务器
                this.$http.post("/sysmgr/distruibute/delete",{
                    ids: [id]
                })
                .then((response) => {
                    this.$notify({
                        title: '消息',
                        type: 'success',
                        message: '删除系统 '+ this.input_name + '成功!'
                    })
                }, (response) => {

                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        handleSizeChange: function() {

        },
        handleCurrentChange: function() {

        },
        dialogCancel: function() {
            this.dialogFormVisible = false;
        },
        dialogConfirm: function() {
            if(!this.input_abbr) {
                this.$message({
                    type: 'info',
                    message: '请输入简称'
                })
                return;
            }
            if(!this.input_url) {
                this.$message({
                    type: 'info',
                    message: '请输入url'
                })
                return;
            }

            if(this.shouldUserAdd) {
                this.$message({
                    type: 'info',
                    message: '正在添加'
                })
                this.$http.post("/sysmgr/distribute/save", {
                    name: this.input_name,
                    url: this.input_url,
                    abbr: this.input_abbr
                })
                .then((response) => {
                    this.$notify({
                        title: '消息',
                        type: 'success',
                        message: '添加系统 '+this.input_name+' 成功!'
                    })
                }, (response) => {

                })
            }else {
                this.$message({
                    type: 'info',
                    message: '正在修改'
                })
                this.$http.post("/sysmgr/distruibute/save", {
                    id: this.id,
                    name: this.input_name,
                    url: this.input_url,
                    abbr: this.input_abbr,
                })
                .then((response) => {
                    this.$notify({
                        title: '消息',
                        type: 'success',
                        message: '修改系统 '+this.input_name+' 信息成功!'
                    })
                }, (response) => {

                })
            }
        },
        userAdd: function() {
            this.dialogTitle = "系统添加";
            this.dialogFormVisible = true;
            this.shouldUserAdd = true;

            this.input_name = '';
            this.input_abbr = '';
            this.input_url = '';
        }
    },
    mounted() {
        this.fetchServerData()
    }
};
</script>

<style>

</style>
