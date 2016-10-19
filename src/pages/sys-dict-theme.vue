<template>

    <div class="">
        <el-card class="box-card" style="height: 800px;">
            <el-button type="primary" icon="plus" @click.native="themeAdd" style="margin-bottom: 10px"></el-button>
            <el-table
                :data="themeList"
                border
                stripe
                style="width: 100%">
                <el-table-column
                    property="id"
                    label="ID"
                    width="50">
                </el-table-column>
                <el-table-column
                    property="name"
                    label="主题名称"
                    width="130">
                </el-table-column>
                <el-table-column
                    inline-template
                    label="操作"
                    width="150">
                    <div style="text-align: center">
                        <el-button type="primary" icon="edit" @click.native="editTheme(row.name, row.id)">
                        </el-button>
                        <el-button type="danger" icon="delete" @click.native="deletTheme(row.name,row.id)"></el-button>
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
            <el-form-item label="主题名称">
                <el-input v-model="input_name"></el-input>
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
            themeList: [],
            themeName: '',
            themeId: 1,
            pageSize: 20,
            pageIndex: 1,
            totalSize: 20,
            dialogFormVisible: false,
            dialogTitle: '',
            input_name: '',
            confirm_button: false,
            shouldThemeAdd: false,
            type: 0
        }
    },
    components: {
    },
    mounted() {
        this.fetchServerData()
    },
    watch: {
        input_name: function(val) {
            this.confirm_button = (!(val===this.themeName)) ? false : true
            if(val.length<=0){
                this.confirm_button = true
            }
        }
    },
    methods: {
        fetchData(callback,params={}) {
            let defaultParams = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                type: 0
            };
            let data = Object.assign({},defaultParams,params);
            this.$http.get("/sysmgr/dict/query",
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
                this.themeList = response.data.subjectList;
                this.totalSize = response.data.totalSize;
            })
        },
        deleteThemeFromServer: function() {
            this.$http.post("/sysmgr/dict/delete",{
                ids: [this.themeId]
            })
            .then((response) => {
                this.$notify({
                    title: '消息',
                    message: '删除 '+this.themeName+' 主题成功',
                    type: 'success'
                })
                this.fetchServerData()
            }, (response) => {

            })
        },
        deletTheme: function(name,id) {
            this.themeName = name;
            this.themeId = id;
            this.$confirm('此操作将删除 '+this.themeName+' 主题，是否继续？','提示', {
                type: 'warning'
            }).then(() => {
                this.deleteThemeFromServer()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        themeAdd: function() {
            this.dialogTitle = '主题添加';
            this.input_name = '';
            this.themeId = null;
            this.dialogFormVisible = true;
            this.shouldThemeAdd = true;
            this.type = 0;
        },
        editTheme: function(name, id) {
            this.dialogTitle = '主题编辑';
            this.themeName = name;
            this.themeId = id;
            this.type = 0;
            this.input_name = name;
            this.dialogFormVisible = true;
            this.shouldThemeAdd = false;
        },
        dialogCancel: function() {
            this.dialogFormVisible = false;
            this.$message({
                type: 'info',
                message: '已取消操作'
            })
        },
        dialogConfirm: function() {
            this.$http.post("/sysmgr/dict/save", {
                id: this.themeId,
                name: this.input_name,
                type: this.type
            })
            .then((response) => {
                this.$notify({
                    title: '消息',
                    message: this.dialogTitle+' '+this.themeName+' 成功!',
                    type: 'success'
                })
                this.fetchServerData()
                this.dialogFormVisible = false;
            },(response) => {

            })
        },
        handleSizeChange: function() {

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
