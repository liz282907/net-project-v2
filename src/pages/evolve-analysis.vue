<template>

  <div class="wrapper clearfix" style="padding-top:20px;">
      <div class="search-box">
          <input type="text"  placeholder="搜索" v-model="searchContent" @keyup.enter="search_keydown" class="search-input">
      </div>
      <div class="form-list">
          <table class="my-table">
                <thead>
                  <tr><th>序号</th><th>关键词</th><th>敏感度</th><th>搜索量</th><th>命中数</th><th>命中率</th><th>热度趋势</th><th>时间</th><th>相关事件</th></tr>
                </thead>
                <tbody>
                    <tr v-for="word in transformedWordList">
                        <td>{{word.id}}</td>
                        <td>{{word.name}}</td>
                        <td>{{word.sensitivity}}</td>
                        <td>{{word.searchNum}}</td>
                        <td>{{word.hitNum}}</td>
                        <td>{{word.hitRate}}</td>
                        <td>{{word.trend}}</td>
                        <td>{{word.date}}</td>
                        <td>{{word.event}}</td>
                    </tr>
                </tbody>

            </table>
      </div>
      <div class="page-wrapper">
          <pagination :total-size="totalSize" @page-click="handlePageClick"></pagination>
      </div>


  </div>


</template>

<script>
import Pagination from "../components/Pagination/pagination";

export default {
	props:["id"],
	components:{
		"pagination": Pagination
	},

	data () {
	return {
		totalSize:50,
		transformedWordList:{},
		searchContent:""
	}
	},
	computed:{

	},
	
	watch:{
		"id":function(){
			alert(this.id);
		}
	},

	methods:{
		handlePageClick:function(page){
			alert(page);
		},
		search_keydown:function(){
			alert(this.searchContent);
		}
	},
  
  created:function(){
		this.transformedWordList = [
				{
					"id":1,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":1299,
					"hitNum":956,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-02",
					"event":"习近平55",
					"route": "test"
				},
				{
					"id":2,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":333,
					"hitNum":129,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-03",
					"event":"习近平44",
					"route":  "test"
				},
				{
					"id":3,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":1299,
					"hitNum":956,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-02",
					"event":"习近平12",
					"route": "test"
				},
				{
					"id":4,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":333,
					"hitNum":129,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-03",
					"event":"习近平sdfsdf",
					"route":  "test"
				},
				{
					"id":5,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":1299,
					"hitNum":956,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-02",
					"event":"习近平sdf",
					"route": "test"
				},
				{
					"id":6,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":333,
					"hitNum":129,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-03",
					"event":"习近平sdfa",
					"route":  "test"
				},
				{
					"id":7,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":1299,
					"hitNum":956,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-02",
					"event":"习近平df",
					"route": "test"
				},
				{
					"id":8,
					"name":"低危词",
					"sensitivity":"30%",
					"searchNum":333,
					"hitNum":129,
					"hitRate":"0.1234563",
					"trend":"增长",
					"date":"2016-09-03",
					"event":"习近平f",
					"route":  "test"
				}
			];
			
			for(var obj in this.transformedWordList){
				var temp = this.transformedWordList[obj];
				temp.hitRate = Math.round(parseFloat(temp.hitRate)*10000)/100 + "%";
			}
  },

  mounted:function(){
		console.log(this.transformedWordList);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/styles/common/base.scss";

.table{

    width: 100%;
    margin: 20px auto;
    // table-layout: fixed;
    th,td{
        box-sizing:border-box;
        display: table-cell;
        padding: 10px 20px;
        text-align: center;
		font-size:0.8rem;
		font-family:"微软雅黑"
    }
    th{
        height: 30px;
        text-align: center;
    }
}

/**
reset style
*/
.pagination,.input-wrapper{
	display: inline-block;
	vertical-align: middle;
	margin: 0;
}

.wrapper{
    width: 100%;
}

.my-table{
    @extend .table;
    th {
        background-color: steelblue;
        color: white;
    }
    // tbody{
    //     // display: block;
    //     height: 100px;
    //     overflow: auto;
    // }
    tr:hover {background-color: $table-hover}
    tr:nth-child(even){background-color: $table-even}
    td:nth-child(even){color:$base-color;}
}

.page-wrapper{
	float:right;
}
</style>

