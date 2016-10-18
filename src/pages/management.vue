<template>
    <div class="manage-container" v-loading.fullscreen="fullscreenLoading" >
        <div class="filter-part">
            <el-breadcrumb separator="/" class="filter-breadcrumb">
                <el-breadcrumb-item>全部</el-breadcrumb-item>
                <el-breadcrumb-item class="topic-menu">
                    {{curTopic}}
                    <i class="iconfont"></i>
                    <ul class="clearfix topic-submenu">
                        <li class="topic-item" v-for="topic in topics"
                            @click="chooseTopic(topic)">{{topic.name}}</li>
                    </ul>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-input placeholder="请输入内容" v-model.trim="searchInput" style="width: 300px;" @keyup.native.13="fetchKeywordList">
                        <el-select v-model="searchSelect" slot="prepend">
                            <el-option label="关键词" value="keyword" selected></el-option>
                            <el-option label="来源" value="source"></el-option>
                        </el-select>
                    </el-input>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="filter-tags">
                <section class="tag-bar clearfix"> <span class="tag-key">分类：</span>

                    <div class="tag-value">
                        <ul class="tag-expand clearfix">
                            <li v-for="item in categories" :key="item" :class="[ 'tag', { active: parseInt(item.id)===filterCategory }]"
                                @click="setFilter('filterCategory',item.id)">
                            {{item.name}}</li>
                        </ul> <span class="tag-more">展开<i class="iconfont arrow-closed"></i></span>

                    </div>
                </section>
                <section class="tag-bar clearfix"> <span class="tag-key">显示内容：</span>

                    <div class="tag-value">
                        <ul class="tag-expand clearfix">
                            <li v-for="id in Object.keys(statusDict)"
                                :class="[ 'tag', { active: parseInt(id)===filterContent }]" :key="id"
                                @click="setFilter('filterContent',id)">
                                {{statusDict[id]}}
                            </li>
                        </ul> <span class="tag-more">展开<i class="iconfont arrow-closed"></i></span>

                    </div>
                </section>
            </div>
        </div>
        <div class="table-part clearfix">
            <!-- 按钮组和多选反选 -->
            <div class="table-actions">
                <!-- <el-checkbox class="checkbox mycheckbox" v-model="chooseAll">全选</el-checkbox> -->
                <el-checkbox class="checkbox mycheckbox" @change='chooseOtherKeywords'>反选</el-checkbox>
                <el-button-group class="action-group">
                  <el-button  type="info"  size="small" :disabled="tableSelection.length<=0?true:false" @click.native="auditBatch(1)">选中通过
                  </el-button>
                  <el-button  type="danger" :plain="true" size="small" :disabled="tableSelection.length<=0?true:false"
                    @click.native="auditBatch(2)">选中拒绝</el-button>
                </el-button-group>
                <el-button-group class="action-group">
                  <el-button  type="info"  size="small" @click.native="auditAll(1)">全部通过</el-button>
                  <el-button   type="danger" :plain="true" size="small" @click.native="auditAll(2)">全部拒绝</el-button>
                </el-button-group>

            </div>

            <!-- 列表 -->
            <el-table :data="keywordList" selection-mode="multiple" border stripe style="width: 100%" @selectionchange="handleMultipleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column inline-template label="关键词" width="120">
                    <div>
                        <div v-if="isEditingArr[$index]">
                            <el-input :placeholder="row.keyword" size="small"
                              v-model="row.keyword" >
                            </el-input>
                        </div>
                        <div v-else>{{ row.keyword }}</div>
                    </div>

                </el-table-column>
                <el-table-column property="entryTime" label="录入时间" sortable></el-table-column>
                <el-table-column property="assessTime" label="审核时间" sortable></el-table-column>
                <el-table-column property="source" label="来源" ></el-table-column>
                <el-table-column  inline-template label="分类" >
                    <div>
                        <ul v-show="!isEditingArr[$index]">
                            <el-tag v-for="item in row.category" class="inner-tag">{{categoryDict[item]}}</el-tag>
                        </ul>
                        <el-select v-model="row.category" multiple v-show="isEditingArr[$index]" class="dropdown-cell">
                            <el-option v-for="item in categories" :label="item.zh_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-table-column>
                <el-table-column  label="状态"  inline-template width="100">
                    <span>{{statusDict[row.status+""]}}</span>
                </el-table-column>
                <el-table-column inline-template label="操作">
                    <div>
                        <div v-show="!isEditingArr[$index]">
                            <div v-if="isAdmin && row.status===0" class="buttongroup-wrapper">
                                <el-button-group class="action-group">
                                  <el-button type="primary" icon="edit" @click.native="editKeyword($index)" size="mini"></el-button>
                                  <el-button type="primary" icon="delete" size="mini" @click.native="deleteKeyword($index)"></el-button>
                                </el-button-group>
                                <el-button-group class="action-group">
                                  <el-button type="primary" icon="circle-check" size="mini" @click.native="audit(row,1,$index)">通过</el-button>
                                  <el-button type="primary" icon="circle-close" size="mini" @click.native="audit(row,2,$index)">拒绝</el-button>
                                </el-button-group>
                            </div>
                            <div v-if="!isAdmin && row.status===0" class="buttongroup-wrapper">
                                <el-button-group>
                                  <el-button type="primary" icon="edit" size="mini"></el-button>
                                  <el-button type="primary" icon="delete" size="mini"></el-button>
                                </el-button-group>
                            </div>
                        </div>
                        <div v-show="isEditingArr[$index]" class="buttongroup-wrapper">
                            <el-button-group class="action-group ">
                              <el-button type="primary" icon="circle-check" size="mini" @click.native="updateWord($index)">更新</el-button>
                              <el-button type="primary" icon="circle-close" size="mini" @click.native="cancel($index)">取消</el-button>
                            </el-button-group>
                        </div>

                    </div>


                </el-table-column>

            </el-table>

            <!-- 分页部分 -->
            <div class="pagination-wrapper">
                <el-pagination

                  @currentchange="handleCurrentChange"
                  :current-page="curPage"
                  :page-size="pageSize"
                  layout="prev, pager, next, jumper"
                  :total="totalCount">
                </el-pagination>
            </div>

        </div>
        <!-- 一种是model为keywordList[curIndex],一种是form然后更新某一行-->
        <el-dialog title="编辑关键词" v-model="dialog.dialogFormVisible" size="tiny">
          <el-form :model="dialog.form">
            <el-form-item label="关键词" label-width="200">
              <el-input v-model="dialog.form.keyword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" label-width="200">
              <el-select v-model="dialog.form.category" placeholder="请选择分类" multiple>
                <el-option :label="item.name" v-for="item in categories.slice(1)" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click.native="dialog.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click.native="updateWord">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
// import {topics} from '../../utils/mock.js';
import { urls, statusDict } from '../../utils/constants.js';


let timer;

// const defaultQueries = {
//         userid: 1,
//         pageSize:50,
//         pageIndex:1,
//         topic: "习近平",
//         filterContent: 1,
//         filterCategory: 1,
//         filterSelect: "keyword",
//         filterInput:""
//     }

export default {
  components: {
  },

  created(){
    //fetch subject and category

  },

  beforeMount(){
    console.log("management will mount");

  },
  mounted(){

    // console.log("management  mounted");
    // this.fullscreenLoading = true;

    this.fullscreenLoading = true;
    let topicPromise = this.$http.get(urls.topic,{params: {type: 0}})
        .then(response=>{
          this.topics = response.body.subjectList;
        });
    let categoryPromise = this.$http.get(urls.category,{params: {type: 1}})
        .then(response=>{
          this.categories = response.body.categoryList;
        });
    Promise.all([topicPromise,categoryPromise]).then(response=> {
        this.fetchKeywordList();
      })
        .catch(err=>{
          console.log("获取数据失败");

        });
  },

  data(){
    return {
        fullscreenLoading: false,
        dialog:{
            dialogFormVisible: false,
            formLabelWidth: 200,
            form: {
                keyword: '',
                category: []
            },
            curIndex: null
        },

        curTopic: "习近平",
        // topics: this.$parent.subjects,
        topics: [],
        categories: [],
        searchInput: '',
        searchSelect: 'keyword',
        filterCategory: -1,
        filterContent: -1,
        // categories: this.$parent.categories,

        statusDict,
        keywordList: [] ,
        isAdmin: true,
        isEditingArr: [],

        curPage: 1,

        pageSize: 20,

        tableSelection:[],
        test: []

    }
  },

  computed: {

        // topics(){
        //     return this.$parent.subjects;
        // },

        // categories(){
        //     return this.$parent.categories;
        // },

        curUserId(){
            return 1;
        },

        canBeMounted(){
            return (this.topics && this.categories && this.topics.length>0 && this.categories.length>0);
        },

        queryObj(){
            return {
                userId: 1,
                pageSize: this.pageSize,
                pageIndex: this.curPage,
                subjectId: this.curTopic.id,
                filterContent: this.filterContent,
                filterCategory: this.filterCategory,
                searchSelect: this.searchSelect,
                searchInput: this.searchInput
            }

        },

        categoryDict(){
            //["name":,"id":1] => {1:name}
           return this.categories.reduce((prev,cur)=>{
                prev[cur["id"]] = cur["name"];
                return prev;
            },{});
        },

        prevKeywordList(){
            return this.keywordList.map(item=> ({
                keyword: item.keyword,
                category: item.category
            }))
        },
        totalCount(){
            return this.pageSize* this.totalSize;
        }
  },

  watch: {
    searchInput(newValue, oldValue){//即时搜索，监听搜索框变化，每隔500ms发送请求

        clearTimeout(timer);
        if(newValue.trim() !==oldValue.trim())
            timer = setTimeout(this.fetchKeywordList,500);
    }
  },

  methods:{

    /* 点击筛选条件的tag时设置active同时获取列表*/
    setFilter(key,item){
        this[key] = parseInt(item);
        this.fetchKeywordList();
    },

    chooseTopic(topic){
        this.curTopic = topic;
        this.fetchKeywordList();
    },

    handleMultipleSelectionChange(val){
        this.tableSelection = val;
    },

    handleCurrentChange(curPage){
        //存储用户选项
        this.curPage = curPage;
        this.fetchKeywordList();
    },
    /* 反选 */
    chooseOtherKeywords(val){
        const selectedArr = this.$children.filter(child=>{
            return child.$el.className.indexOf("el-table")!==-1;
        })[0];

        selectedArr.tableData.forEach(item=>{
            item.$selected = !item.$selected;
        })

    },

    fetchKeywordList(updatedQuery ={}){

        let params = Object.assign({},this.queryObj,updatedQuery);

        this.$http.get(urls.keywordList,{params: params}).then(response=>{

            // debugger;

            this.fullscreenLoading = false;
            // ({totalSize : this.totalSize,keywordList : this.keywordList} = response.body);
            this.totalSize = response.body.totalSize;
            this.keywordList = response.body.keywordList;
            //维护keywordList是否在编辑状态
            this.isEditingArr = new Array(this.keywordList.length).fill(false);
            console.log("keywordList",this.keywordList);
        }).catch(err=>{
            //web notification
            console.log("error in keywordList",err);
            this.fullscreenLoading = false;
            this.$message({
              message: '获取关键词列表失败',
              type: 'error'
            });
        });
    },

    sendAuditPost(receivedObj,cb){
        const defaultObj = {
            userId: this.curUserId,
            filterContent: this.filterContent,
            filterCategory: this.filterCategory,
            searchSelect: this.searchSelect,
            searchInput: this.searchInput
        };
        let postObj = Object.assign({},defaultObj,receivedObj);
        this.$http.post(urls.audit,postObj).then(response=>{
            this.showMessage("审核成功","success")
        }).catch(err=>{
            // this.$set(this.keywordList,index,prevRow);
            if(cb) cb();
            this.showMessage("审核失败","error")
        })
    },

    /*用于发送请求后更改前端list上的值*/
    updateTableRow(index,property,value){
        const prevRow = this.keywordList[index];
        let updatedState = { [property]: value };
        const updatedRow = Object.assign({},this.keywordList[index],updatedState);
        this.$set(this.keywordList,index,updatedRow);
    },

    validateAudit(){

    },

    audit(row,status,index){

        if(row.category.length<=0) {
            this.showMessage("请至少选择一个分类","warning");
            this.editKeyword(index);
            return;
        }

        //更新列表
        this.updateTableRow(index,'status',status);
        // this.updateTableRow(index,'status',auditStates.filter(stateObj=> stateObj.id===state)[0]);
        const postObj = {
            keywords: row.keyword,
            status,
        }

        this.sendAuditPost(postObj,function(){
            this.$set(this.keywordList,index,prevRow);
        });


    },

    /* 批量更改 */
    auditBatch(status){

        /*待做分类check*/

        const notAuditedArr = this.tableSelection.filter(row=> row.status===0);
        {
            //检查是否有分类未选中，更人性的是高亮改行。todo
            debugger;

            // let notAuditedArr = this.keywordList.filter(row=>{
            //     console.log("row ",this.tableSelection.indexOf(row));
            //     return (this.tableSelection.indexOf(row)!==-1 && row.status===0)
            // });

            if(notAuditedArr.length<=0) return;
            const validateAudit = notAuditedArr.every(row=> row.category.length>0);

            if(!validateAudit){
                this.showMessage("您有关键词未选择分类","warning");
                return;
            }
        }

        const prevKeywordList = this.keywordList;
        const keywords = notAuditedArr.map(row=> row.keyword );
        const postObj = {
            keywords,
            status
        };

        this.sendAuditPost(postObj,function(){
            this.keywordList = prevKeywordList;
        });
        // const updatedState = auditStates.filter(stateObj=> stateObj.id===state)[0];
        this.keywordList.forEach((row,index)=>{
            if(keywords.indexOf(row.keyword)!==-1 && row.status===0)
                this.updateTableRow(index,'status',status);
        });

    },

    /* 全部更改 */
    auditAll(status){
        //未更改的keywordList
        const prevKeywordList = this.keywordList;

        this.sendAuditPost({status},function(){
            //失败则回退到原来的状态
            this.keywordList = prevKeywordList;
        });

        this.tableSelection = this.keywordList;
        //更新前端列表
        this.keywordList.forEach((row,index)=>{
            if(row.status===0)
                this.updateTableRow(index,'status',status);
        });
    },

    showMessage(message,type){
        this.$message({message,type});
    },

    deleteKeyword(index){
        this.keywordList.splice(index,1);
        this.$http.post(urls.delete,{
            keyword: this.keywordList[index].keyword,
            userId: this.curUserId
        }).then(response=>this.showMessage("删除成功","success"),
                err=>this.showMessage("删除失败","error"));
    },

    editKeyword(index){
        // debugger;
        this.dialog.dialogFormVisible = true;
        const curRowData = this.keywordList[index];
        // let formData = this.dialog.form;
        // ({ keyword: formData.keyword,category:formData.category} = curRowData);
        this.dialog.form.keyword= curRowData.keyword;
        this.dialog.form.category = curRowData.category;
        this.dialog.curIndex = index;
        // this.change2EditState(index,true);
        // this.$set(this.isEditingArr,index,true);
    },

    updateWord(){
        // this.change2EditState(index,false);
        this.dialog.dialogFormVisible = false
        //post
        /* 更新前的数据 */
        const {keyword,category} = this.keywordList[this.dialog.curIndex],
              index = this.dialog.curIndex;


        /* 无效请求，词或分类没有变更时*/
        if( keyword===this.dialog.form.keyword &&
            JSON.stringify(this.dialog.form.category.sort())===JSON.stringify(category.sort()))
            return;
        this.$http.post(urls.update,{
            prevWord: keyword,
            newWord: this.dialog.form.keyword,
            category: this.dialog.form.category
        }).then(response=>{
            this.showMessage("更新成功","success");

            this.updateTableRow(index,'keyword',this.dialog.form.keyword);
            this.updateTableRow(index,'category',this.dialog.form.category);

        }).catch(err=>{
            this.showMessage("更新失败","error");

            this.updateTableRow(index,'keyword',keyword);
            this.updateTableRow(index,'category',category);

        })
    },

    cancel(){
        // this.change2EditState(index,false);
        const index = this.dialog.curIndex;
        this.updateTableRow(index,'keyword',this.prevKeywordList[index].keyword);
        this.updateTableRow(index,'category',this.prevKeywordList[index].category);
    },

    change2EditState(index,state){
        this.$set(this.isEditingArr,index,state);
    }
  },

};

</script>

<style>

</style>
