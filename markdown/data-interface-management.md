1. categories是后台给的还是？

### 获取用户权限



### 获取分类

#### request

```
url: yoursite.com/management/category
method: "get"
```

#### response

```
[
    {"zh_name": "全部", "id": 1},
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
    userid: 1,        //要么？
    pageSize:50,
    pageIndex:1,
    topic: "习近平"
    filterCategory:1,
    filterContent: 1,   //显示内容：全部|未审核|已通过|未通过
    searchSelect: "keyword"|"source" 搜索的限定，关键词|来源
    searchInput:"习近平"        
}
```

#### response

```
{
    "totalCount": 400,
    "keywordList": [
    {
        "keyword": "习近平",
        "inputTime": "2016-07-24 19:23",   //录入时间
        "auditTime": "2016-07-29 19:33",   //审核时间
        "source": "张三",                 
        "state": {"zh_name":"已通过","id":3}  //2：未审核，3：已通过，4：已拒绝
    },
    {
        "keyword": "习近平",
        "inputTime": "2016-07-24 19:23",
        "auditTime": "2016-07-29 19:33",
        "source": "张三",
        "state": {"zh_name":"已通过","id":3}  //2：未审核，3：已通过，4：已拒绝
    }
    ]

}

```


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

### 关键词删除
```
url: yoursite.com/management/delete
method: "post"
params:{
    userid: 1,        //要么？
    keyword: "习近平"
}
```


词的增删改

#### 更新（update）

需要取消上一个同名的请求

**request**

```
url: yoursite.com/#!/title
method: "post"
request body:{
    category:"forbidden words"|"check words"|"low danger",
    [id：6,]//若词本身唯一，则该字段可不加
    prevWord:"习大大",
    newWord:"习近平", 
    action:"patch"  
}
```

#### 增（create）

**request**

```
url: yoursite.com/#!/title
method: "post"
request body:{
    category:"forbidden words"|"check words"|"low danger",
    word:"习近平",    
}
```

#### 删（create）

**request**

```
url: yoursite.com/#!/title
method: "post"
request body:{
    category:"forbidden words"|"check words"|"low danger",
    word:"习近平"  //此处同上，id的问题   ,
    action:"delete"
}
```