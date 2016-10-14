<template>
	<div>
        <ul class="pagination">
          <!--
            <li :class="pageList[0]===1?'disabled':''"><a href="javascrpt:void(0)" @click="changePagination(-1)">&laquo;</a></li>
          -->
          <li :class="curPage<=1?'disabled':''"><a href="javascrpt:void(0)" @click="changePagination(-1)">&laquo;</a></li>

            <li v-for="value in pageList"
                :class="[value===curPage?'active':'',value>totalSize?'disabled':'']"
                @click="clickPage(value)">
                <a href="javascrpt:void(0)">{{value}}</a>
            </li>
            <!--
            <li><a href="javascrpt:void(0)">...</a></li>
            <li :class="pageList.slice(-1)[0]>=totalSize?'disabled':''"><a href="javascrpt:void(0)" @click="changePagination(1)">&raquo;</a></li>
            <li :class="pageList.slice(-1)[0]>=totalSize?'disabled':''"><a href="javascrpt:void(0)" @click="changePagination(1)">&raquo;</a></li>

            -->
            <li v-if="!((curPage>=totalSize-1)||(totalSize<5))"><a href="javascrpt:void(0)">...</a></li>
            <li :class="curPage>=totalSize?'disabled':''"><a href="javascrpt:void(0)" @click="changePagination(1)">&raquo;</a></li>
        </ul>
        <span class="input-wrapper">转到第
            <input type="number" min="1" :max="totalSize" class="page-input"
                @keyup.13 = "changePage" v-model="toPage"/>/{{totalSize}}页
        </span>
	</div>
</template>

<script>


export default {

  name:"Pagination",

  props:["totalSize"],

  data () {

    return {
      //toPage:1,
      curPage:1,
      pageList:[1,2,3,4,5],
    }
  },

  computed:{

      toPage:{
        get:function(){
          return this.curPage;
        },
        set:function(page){
          this.curPage = page;
        }
      }
  },

  methods:{

    //跳转到某一页
    changePage(){

      let toPage = parseInt(this.toPage);
      //if(this.toPage>this.totalSize)
      if((this.toPage>this.totalSize)||(this.toPage<1))
         return
      else if(this.toPage>=(this.totalSize-4)){
        this.pageList = [0,1,2,3,4].map(index=>{return this.totalSize-4+index;});
        this.clickPage(toPage);
      }else{
        this.pageList = [0,1,2,3,4].map(index=>{return toPage+index;});
        this.clickPage(toPage);
      }


    },

    clickPage(page){
    //yezi
     if(page>this.totalSize) return;
      // 点击最后一页，pageList里的item自增一次
      if(page===this.pageList.slice(-1)[0]){
        if(!(this.curPage>=this.totalSize-1)){
          this.pageList = this.pageList.map(page=>{
            return page+1;
          })
        }
      }
      // 点击第一页，pageList里的item自减一次
      if(page===this.pageList[0]){
        if(!(page===1)){
          this.pageList = this.pageList.map(page=>{
            return page-1;
          })
        }
      }
      //




      this.curPage = page;
      console.log(" totalSize",this.totalSize);
      console.log("in pagination");

      this.$emit("page-click",page);
    },

    //左右增加减少页
    changePagination(step){

/*       //luchen
      //限制
      if(this.pageList.slice(-1)[0]>=this.totalSize-1)
        return;


      //step:[1,-1]
      if((step===-1 && this.pageList[0]===1)||(step===1 && this.pageList.slice(-1)===this.totalSize))
        return;
      this.pageList = this.pageList.map(page=>{
        return page+step;
      });
      this.clickPage(this.curPage+step);

*/
      switch (step) {
          case 1:{
              if(this.curPage>=this.totalSize) return;
              this.clickPage(parseInt(this.curPage)+step);
              if (this.curPage===this.pageList.slice(-1)[0]) {
                if(this.curPage===this.totalSize) return;
                this.pageList = this.pageList.map(page=>{
                  return page+step;
                })
              }
              break;
          }
        //step:[1,-1]
        case -1:
          {
              if(this.curPage<=1) return;
              this.clickPage(parseInt(this.curPage)+step);
              if (this.curPage===this.pageList[0]){
                  if(this.curPage===1) return;

                  this.pageList = this.pageList.map(page=>{
                     return page+step;
                      });
                }
              break;
          }

    }
    },


  }
}
</script>

<style>
.pagination,.input-wrapper{
	display: inline-block;
	vertical-align: middle;
	margin: 0;
	font-family:"微软雅黑";
}

.pagination li{
	float:left;
	padding:3px 5px 3px 5px;
	border:1px solid gray;
	border-radius:7px;
	
	cursor:pointer;
}

.page-input{
  width:40px;
}

.pagination li a{
	color:steelblue;
}

</style>
