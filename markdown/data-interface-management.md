## 关键词管理接口
>
@author: luchen

>email : chenlu.seu@gmail.com


### 获取用户权限

这部分接口已有吗？还是在登录的时候已经全局获取到了
登录时获取

### 获取分类

#### request

```
url: yoursite.com/management/subject
method: "get"
{
    type = 0    // 参数type  0|1|2 ->  主题|分类|专题
}
```

#### response

```
[
    {"zh_name": "全部", "id": -1},          
    {"zh_name": "出访", "id": 2},
    {"zh_name": "下基层", "id": 3},
    {"zh_name": "讲话", "id": 4},
    {"zh_name": "国际会议","id": 5}
]
```

---


### 获取关键词列表
#### request
```
url: yoursite.com/management/keywordList
method: "get"
params:{
    userid: 1,        //要么？       //yes
    pageSize:50,
    pageIndex:1,
    topic: "习近平"                          // id
    filterCategory:1,
    filterContent: 1,   //显示内容：全部|未审核|已通过|未通过
    searchSelect: "keyword"|"source" 搜索的限定，关键词|来源
    searchInput:"习近平"        
}
```

#### response

```
{
    "totalCount": 400,              //totalSize 页码数
    "keywordList": [
    {
        "keyword": "习近平",
        "inputTime": "2016-07-24 19:23",   //录入时间
        "auditTime": "2016-07-29 19:33",   //审核时间
        "source": "张三",    
        "category": [1,3], //对应于上面的category列表             
        "state": {"zh_name":"已通过","id":3}  //2：未审核，3：已通过，4：已拒绝
    },
    {
        "keyword": "习近平",
        "inputTime": "2016-07-24 19:23",
        "auditTime": "2016-07-29 19:33",
        "source": "张三",
        "category": [1],
        "state": {"zh_name":"已通过","id":3}  //2：未审核，3：已通过，4：已拒绝
    }
    ]

}

```


---

### 关键词的编辑、删除、审核

#### 审核request
```
url: yoursite.com/management/audit
method: "post"
params:{
    userid: 1,        //要么？
    keywords: "习近平"  | ["习近平","习大大"]
    state: 3 (通过)| 4 (拒绝)
}
```

单个词审核/批量通过,
如果没有keywords这一项，表明全部通过/拒绝

#### 关键词删除
```
url: yoursite.com/management/delete
method: "post"
params:{
    userid: 1,        //要么？
    keyword: "习近平"
}
```


#### 更新（update）
**request**

```
url: yoursite.com/management/update
method: "post"
request body:{
    userid: ?
    prevWord: "习大大",
    newWord: "习近平",
    category: [1,3],
}
```

