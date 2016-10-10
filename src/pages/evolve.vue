<template>

     <div id="evolve-main">
		<div class="left-container left">
			<div v-for="title in titleList" class="title-container">
				<div @click="title_click(title)" class="title-div pointer">
					{{title.name}}
				</div>
				<div @click="topic_click(topic,titleList)" v-for="topic in title.children" v-show="title.showflag" class="topic-div pointer" :class="{'topic-current':topic.isCurrent}">
					{{topic.name}}
				</div>
			</div>
		</div>
		<div class="right-container left">
			<div class="right-tab">
				<div v-for="tab in tabList" @click="tab_click(tab,tabList)" class="left right-tab-div pointer" :class="{'tab-current':tab.isCurrent}">{{tab.name}}</div>
			</div>
			<div class="right-content">
				<evolve-export v-show="tabList[0].isCurrent" :id="topicCurrent"></evolve-export>
				<evolve-analysis v-show="tabList[1].isCurrent" :id="topicCurrent"></evolve-analysis>
			</div>
		</div>
	 </div>

</template>

<script>
import EvolveExport from "./evolve-export";
import EvolveAnalysis from "./evolve-analysis";

export default {
	data(){
		return {
			titleList:[],
			tabList:[
				{
					name:"关键词配置",
					isCurrent:true
				},
				{
					name:"命中统计",
					isCurrent:false
				}
			],
			topicCurrent:""
		}
	},
	created(){
		var temp = [
			{
				"name":"主题1",
				"children":[
					{
						"name":"专题1",
						"id":"1"
					},
					{
						"name":"专题2",
						"id":"2"
					},
					{
						"name":"专题3",
						"id":"3"
					},
					{
						"name":"专题4",
						"id":"4"
					}
				]
			},
			{
				"name":"主题2",
				"children":[
					{
						"name":"专题1",
						"id":"5"
					},
					{
						"name":"专题2",
						"id":"6"
					},
					{
						"name":"专题3",
						"id":"7"
					},
					{
						"name":"专题4",
						"id":"8"
					}
				]
			}
		];
		for(var key in temp){
			temp[key].showflag = true;
			for(var topic in temp[key].children){
				temp[key].children[topic].isCurrent = false;
			}
		}
		this.titleList = temp;
	},
	components: {
		EvolveExport,
		EvolveAnalysis
	},
	computed:{
		
	},
	
	methods:{
		title_click:function(title){
			title.showflag = !title.showflag;
		},
		tab_click:function(tab,tabList){
			for(var key in tabList){
				tabList[key].isCurrent = false;
			}
			tab.isCurrent = true;			
		},
		topic_click:function(topic,titleList){
			this.topicCurrent = topic.id;
			
			for(var key in titleList){
				for(var obj in titleList[key].children){
					titleList[key].children[obj].isCurrent = false;
				}
			}
			topic.isCurrent = true;
		}
	}
};
</script>

<style>
/*container*/
#evolve-main{
	width:1366px;
	height:700px;
	margin-left:auto;
	margin-right:auto;
	
	border:1px solid black;
}

.left-container{
	width:20%;
	height:100%;
	
	padding:20px;
	overflow:auto;
}

.right-container{
	padding:20px;
	width:80%;
	height:100%;
	
	display:flex;
	flex-direction:column;
}

/*title*/
.title-container{
	border:1px solid gray;
}

.title-div{
	padding:5px 0px 5px 10px;
	font-size:1rem;
	font-family:"黑体";
	color:white;
	
	background:black;
}

.topic-div{
	padding:5px 0px 5px 20px;
	
	font-size:1rem;
	font-family:"微软雅黑";
	color:black;
	
	background:white;
}

.topic-div:hover{	
	background:steelblue;
}

.topic-current{
	color:white;
	background:steelblue;
}

/*content*/
.right-tab{
	width:100%;
	height:3rem;
}

.right-tab-div{
	margin:5px;
	font-size:0.9rem;
	font-family:"微软雅黑";
	padding:5px 20px 5px 20px;
	border-bottom:1px solid gray;
	
}

.right-tab-div:hover{
	border-bottom:3px solid steelblue;
	color:steelblue
}

.tab-current{
	border-bottom:3px solid steelblue;
	color:steelblue
}


.right-content{
	width:100%;
	flex:1;
}

.left{
	float:left;
}

.right{
	float:right;
}
.pointer{
	cursor:pointer;
}
</style>
