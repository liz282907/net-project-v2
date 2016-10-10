<template>
	<div id="keyword" style="width:100%;height:100%;padding-top:20px"></div>
</template>

<script>
import {keyword} from "../assets/js/keyword.js";

export default {
	props:["id"],
	components: {

	},
	mounted:function(){
		creat_keyword(this.id);
	},
	methods:{
		
	},
	watch:{
		"id":function(){
			creat_keyword(this.id);
		}
	}
};

function creat_keyword(id){
	var o = {
		"container":"keyword",
		"id":id
	}
	keyword(o);
}
</script>

<style>
.filter-div{
	width:100%;
	height:3rem;
	line-height:3rem;
	
	padding-left:10px;
	font-family:"微软雅黑";
}

.keyword-table{
	width:100%;
	border-collapse:collapse;
	border:none;
	border-top:5px solid steelblue;
}

.keyword-table th,td{
	border:1px solid #d3d7d4;
	text-align:center;
}

.keyword-table thead{
	
}

.keyword-table thead th{
	width:auto;
	height:3rem;
	
	font-family:"黑体";
	background:	#F7F7F7;
}

.keyword-table tbody td{
	width:auto;
	height:3rem;
	
	font-family:"微软雅黑";
	border:1px solid #d3d7d4;
	text-align:center;
}

/*keyword input*/
input{
	border:none;
	border:1px solid #d3d7d4;
	border-radius:5px;
}

.keyword-input-container{
	display:flex;
}

.keyword-input-content{
	display:flex;
	flex:1;
	height:100%;
	border-right:1px solid #d3d7d4;
}

.keyword-input-button{
	width:50px;
	height:100%;
}

.keyword-textarea{
	flex:1;
	border:0px;
	height:90%;
	overflow:auto;
	resize:none;
	
	font-family:"微软雅黑";
	font-size:0.8rem;
	border-left:1px solid #d3d7d4;
}

.keyword-out-textarea{
	border:0px;
	width:100%;
	height:90%;
	overflow:auto;
	resize:none;
	
	font-family:"微软雅黑";
	font-size:0.8rem;
}

.keyword-button{
	border:none;
	background:steelblue;
	height:2rem;
	line-height:2rem;
	border-radius:5px;
	color:white;
	font-family:"微软雅黑";
	font-size:0.8rem;
	cursor:pointer;
	margin-right:20px;
}

/*icon-ui*/
.ui-icon {
	width: 30px;
	height: 30px;
	cursor:pointer;
}

.ui-icon-del{
	background-image: url("../assets/images/ui-icon-del.png");
}

.ui-icon-dels{
	background-image: url("../assets/images/icon-del.png");
}

.ui-icon-turn{
	background-image: url("../assets/images/icon-turn.png");
}

.ui-icon-add{
	background-image: url("../assets/images/ui-icon-add.png");
}

.left{
	float:left;
}
</style>
