1. css打包后的路径问题。比如main-header.scss的路径应该是相对的，但是写上以后是相对于app.vue的（虽然最终都引入到app.vue里面了）
2. 2. dev-server中的路径也是最外层的好奇怪
3. promise 

```
this.$http.get(urls.category).then(response=>{
        this.categories = response.body;
        let params = Object.assign({},defaultQueries,{filterCategory: response.body[0].id});
        return this.$http.get(urls.keywordList,params);
    }).then(response=>{
        this.fullscreenLoading = false;
        ({totalCount : this.totalCount,keywordList : this.keywordList} = response.body);
    }).catch(err=>{
        //web notification
        this.fullscreenLoading = false;
        this.$message({
          message: '获取关键词列表失败',
          type: 'error'
        });
    });
```
