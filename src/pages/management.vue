<template>
    <div class="manage-container" v-loading.fullscreen="fullscreenLoading">
        <div class="filter-part">
            <el-breadcrumb separator="/" class="filter-breadcrumb">
                <el-breadcrumb-item>全部</el-breadcrumb-item>
                <el-breadcrumb-item>{{curTopic}} <i class="iconfont"></i>

                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-input placeholder="请输入内容" v-model.trim="searchInput" style="width: 300px;">
                        <el-select v-model="searchSelect" slot="prepend">
                            <el-option label="关键词" value="keyword"></el-option>
                            <el-option label="分类" value="category"></el-option>
                        </el-select>
                    </el-input>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="filter-tags">
                <section class="tag-bar clearfix"> <span class="tag-key">分类：</span>

                    <div class="tag-value">
                        <ul class="tag-expand clearfix">
                            <li v-for="item in categories" :key="item" class="tag">{{item.zh_name}}</li>
                        </ul> <span class="tag-more">展开<i class="iconfont arrow-closed"></i></span>

                    </div>
                </section>
                <section class="tag-bar clearfix"> <span class="tag-key">显示内容：</span>

                    <div class="tag-value">
                        <ul class="tag-expand clearfix">
                            <li v-for="item in auditStates" class="tag" :key="item">{{item}}</li>
                        </ul> <span class="tag-more">展开<i class="iconfont arrow-closed"></i></span>

                    </div>
                </section>
            </div>
        </div>
        <div class="table-part clearfix">
            <div class="table-actions">
                <!-- <el-checkbox class="checkbox mycheckbox" v-model="chooseAll">全选</el-checkbox> -->
                <el-checkbox class="checkbox mycheckbox" @change='chooseOtherKeywords'>反选</el-checkbox>
                <el-button-group class="action-group">
                  <el-button  type="info"  size="small">通过</el-button>
                  <el-button  type="danger" :plain="true" size="small">拒绝</el-button>
                </el-button-group>
                <el-button-group class="action-group">
                  <el-button  type="info"  size="small">批量通过</el-button>
                  <el-button   type="danger" :plain="true" size="small">批量拒绝</el-button>
                </el-button-group>

            </div>
            <el-table :data="keywordList" selection-mode="multiple" border stripe style="width: 100%" @selectionchange="handleMultipleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column inline-template label="关键词" width="120">
                    <div>
                        <div v-if="isEditing"><input type="text" :value="row.newKeyword" /></div>
                        <div v-else>{{ row.keyword }}</div>
                    </div>

                </el-table-column>
                <el-table-column property="inputTime" label="录入时间" sortable></el-table-column>
                <el-table-column property="auditTime" label="审核时间" show-tooltip-when-overflow sortable></el-table-column>
                <el-table-column inline-template label="来源" >
                    <div>
                        <div v-show="isEditing">

                        </div>
                        <div v-show="!isEditing">{{ row.source }}</div>
                    </div>

                </el-table-column>
                <el-table-column property="state" label="状态" ></el-table-column>
                <el-table-column inline-template label="操作">
                    <div>
                        <div v-if="isAdmin" class="buttongroup-wrapper">
                            <el-button-group class="action-group">
                              <el-button type="primary" icon="edit" size="mini"></el-button>
                              <el-button type="primary" icon="delete" size="mini"></el-button>
                            </el-button-group>
                            <el-button-group class="action-group">
                              <el-button type="primary" icon="circle-check" size="mini">通过</el-button>
                              <el-button type="primary" icon="circle-close" size="mini">拒绝</el-button>
                            </el-button-group>
                        </div>
                        <div v-else class="buttongroup-wrapper">
                            <el-button-group>
                              <el-button type="primary" icon="edit" size="mini"></el-button>
                              <el-button type="primary" icon="delete" size="mini"></el-button>
                            </el-button-group>
                        </div>
                    </div>

                </el-table-column>

            </el-table>
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
    </div>
</template>

<script>
import keywordList from '../../utils/mock.js';
import { urls } from '../../utils/constants.js';

export default {
  components: {
  },

  data(){
    return {
        fullscreenLoading: false,

        curTopic: "习近平",
        searchInput: '',
        searchSelect: '',
        categories: [ "全部","出访","下基层","讲话","国际会议" ],
        auditStates: [ "全部","未审核","已通过","未通过" ],
        keywordList: keywordList,
        isAdmin: true,
        isEditing: false,

        curPage: 1,
        totalCount: 100,
        pageSize: 20,

        tableSelection:[]

    }
  },

  computed: {

  },

  mounted(){

    //showLoading
    this.fullscreenLoading = true;
    const defaultQueries = {
        userid: 1,        //要么？
        pageSize:50,
        pageIndex:1,
        topic: "习近平",
        filterContent: 1,
        filterSelect: "keyword",
        filterInput:""
    }
    this.$http.get(urls.category).then(response=>{
        this.categories = response.body;
        let params = Object.assign({},defaultQueries,{filterCategory: response.body[0].id});
        return this.$http.get(urls.keywordList,params);
    }).then(response=>{
        this.fullscreenLoading = false;
        this.totalCount = response.body.totalCount;
        this.keywordList = response.body.keywordList;

        // var o = {};
        // ({x:o.x,y:o.x,z:o.z} = {x:2,y:4,z:5});
        // console.log("=======",o);
        ({totalCount : this.totalCount,keywordList : this.keywordList} = response.body);
    }).catch(err=>{
        //web notification
        this.fullscreenLoading = false;
        this.$message({
          message: '获取关键词列表失败',
          type: 'error'
        });
    });

  },

  methods:{
    handleMultipleSelectionChange(val){
        this.tableSelection = val;
    },
    handleCurrentChange(){

    },
    chooseOtherKeywords(val){
        const selectedArr = this.$children.filter(child=>{
            return child.$el.className.indexOf("el-table")!==-1;
        })[0];

        selectedArr.tableData.forEach(item=>{
            item.$selected = !item.$selected;
        })

    }
  },

};

</script>

<style>

</style>
