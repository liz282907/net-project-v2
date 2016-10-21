<template>

    <div class="">
        <el-card class="box-card" style="height: 800px;">

            <el-button-group style="display: block;margin-bottom: 10px;">
                <el-button type="primary" icon="plus" @click.native="categoryAdd"></el-button>
                <el-button type="danger" icon="delete" @click.native="categoryDeleteAll" :disabled="!deleteAll"></el-button>
            </el-button-group>

            <el-table
                :data="categoryList"
                selection-mode="multiple"
                border
                height="600"
                stripe
                style="text-align: left"
                @selectionchange="handleMultipleSelectionChange">
            <el-table-column
                type="selection"
                width="20">
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
                label="分类名称"
                width="100">
            </el-table-column>
            <el-table-column
                inline-template
                label="操作"
                width="145">
            <div style="text-align: center">
                <el-button type="primary" icon="edit" @click.native="editClick(row)">
                </el-button>
                <el-button type="danger" icon="delete" @click.native="categoryDeleteSingle(row.id, row.name)"></el-button>
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
                <!-- <el-form-item label="主题">
                    <el-select v-model="theme_select" :disabled="!shouldCategoryAdd">
                        <el-option
                            v-for="item in themeList"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="分类名称">
                    <el-input v-model="input_name" style="width: 100%"></el-input>
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

var timer = null;

export default {
    data() {
        return {
            search_input: '',
            themeList: [],
            theme_select: 1,
            ids: [],
            categoryList: [],
            totalSize: 20,
            pageIndex: 1,
            pageSize: 10,
            deleteAll: false,
            dialogTitle: '',
            dialogFormVisible: false,
            confirm_button: false,
            input_name: '',
            categoryName: '',
            shouldCategoryAdd: false,
            categoryId: ''
        }
    },
    components: {
    },
    watch: {
        search_input: function() {
            var that = this;
            clearTimeout(timer)
            timer = setTimeout(function() { //延时请求
                that.pageSize = 99999;
                that.fetchServerData()
            }, 500)
        },
        // theme_select: function() {
        //     this.fetchServerData()
        // },
        ids: function(val) {
            this.deleteAll = val.length>1
        },
        input_name: function(val) {
            this.confirm_button = ((!(val==this.categoryName)) ? false : true) || (val.length ? false : true)
        }
    },
    mounted() {
        this.fetchServerData()
    },
    methods: {
        fetchData(callback,params={}){
            let defaultParams = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                // pid: this.theme_select,
                type: 1,
                name: this.search_input
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
            this.accountList = [];
            this.fetchData(function(response) {
                this.categoryList = response.data.categoryList;
                this.totalSize = response.data.totalSize;
            })
        },
        getThemeListFormServer() {
            this.$http.get("/sysmgr/dict/query",{
                params: {
                    pageSize: 99999,
                    pageIndex: 1,
                    type: 0
                }
            })
            .then((response) => {
                this.themeList = response.data.subjectList;
                this.fetchServerData()
            }, (response) => {

            })
        },
        deleteCategoryFromServer() {
            this.$http.post("/sysmgr/dict/delete", {
                ids: this.ids
            })
            .then((response) => {
                this.$notify({
                    title: '消息',
                    message: '删除成功',
                    type: 'success'
                })
                this.fetchServerData()
            }, (response) => {

            })
        },
        saveCategoryToServer() {
            this.$http.post("/sysmgr/dict/save", {
                id: this.categoryId,
                name: this.input_name,
                type: 1
            }).then((response) => {
                this.$notify({
                    title: '消息',
                    message: this.dialogTitle+'成功！',
                    type: 'success'
                })
                this.fetchServerData()
            }, (response) => {

            })
        },
        search_button: function() {
            this.fetchServerData()
        },
        handleMultipleSelectionChange: function(val) {
            this.ids = val.map(function(item) {
                return item.id
            })
        },
        categoryDeleteSingle: function(id,name) {
            this.ids = [id];
            this.$confirm('此操作将删除 '+name+' 分类，是否继续？', '提示', {
                type: 'warning'
            }).then(()=>{
                this.deleteCategoryFromServer()
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        categoryDeleteAll: function() {
            this.$confirm('此操作将删除多个分类，是否继续？', '提示', {
                type: 'warning'
            }).then(()=>{
                this.deleteCategoryFromServer()
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        categoryAdd: function() {
            this.categoryId = null;
            this.input_name = '';
            this.dialogTitle = '添加分类';
            this.shouldCategoryAdd = true;
            this.dialogFormVisible = true;
        },
        editClick: function(item) {
            this.dialogTitle = '编辑分类';
            this.categoryId = item.id;
            this.input_name = item.name;
            this.categoryName = item.name;
            this.shouldCategoryAdd = false;
            this.dialogFormVisible = true;
        },
        handleCurrentChange: function(index) {
            this.pageIndex = index;
            this.fetchServerData();
        },
        handleSizeChange: function() {

        },
        dialogConfirm: function() {
            this.saveCategoryToServer();
            this.dialogFormVisible = false;
        },
        dialogCancel: function() {
            this.dialogFormVisible = false;
        }
    }
};
</script>

<style>
.search_input .el-input {
    width: 100px;
}
</style>
