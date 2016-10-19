<template>
	<div id="keyword" style="width:100%;height:100%;padding-top:20px"></div>
</template>

<script>
import {keyword} from "../assets/js/keyword.js";

export default {
	name:"EvolveExport",
	props:["id"],
	data () {
        return {
			export_system:[]
        }
	},
	components: {

	},
	mounted:function(){
		this.$http.get('sysmgr/distribute/query',
			{
				params:{
					pageSize:100,
					pageIndex: 1,
				}
			}
		).then((response) => {
			// success callback
			this.export_system = response.body["systemList"];
			var o = {
				"container":"keyword",
				"id":this.id,
				"export_system":this.export_system
			}
			creat_keyword(o);	
		}, (response) => {
			// error callback
		});
	},
	methods:{
		
	},
	watch:{
		"id":function(){
			var o = {
				"container":"keyword",
				"id":this.id,
				"export_system":this.export_system
			}
			creat_keyword(o);
		}
	}
};

function creat_keyword(o){	
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
	height:100%;
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
	margin-left:auto;
	margin-right:auto;
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

.ui-icon-import{
	background-image: url("../assets/images/icon-add.png");
}

/*tip*/
.tip{
	position:fixed;
	width:400px;
	height:200px;
	margin:auto;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background:white;
	border:1px solid black;
	border-radius:20px;
	
	padding:20px;
	overflow:auto;
}

.tip-bg{
	position:fixed;
	width:100%;
	height:100%;
	margin:auto;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background:gray;
	opacity:0.9;
}

.tip-button{
	display:inline;
	border:1px solid gray;
	border-radius:5px;
	
	padding-left:20px;
	padding-right:20px;
	
	height:30px;
	line-height:30px;
	
	font-family:"微软雅黑";
	
	cursor:pointer;
	float:right;
}

.tip-button:hover{
	background:steelblue;
}

input[type=checkbox]{
	width:20px;
	height:20px;
	
	vertical-align:middle;
	-webkit-appearance: checkbox;
}

input[type=radio]{
	width:20px;
	height:20px;
	
	vertical-align:middle;
	-webkit-appearance: radio;
}

.left{
	float:left;
}
</style>
