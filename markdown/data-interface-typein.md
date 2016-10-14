
### 获取topic和category

#### category
category沿用关键词管理的部分,后续可能会改url
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

#### topic
```
url: yoursite.com/topic
method: "get"
```

#### response

```
["习近平","习明泽","习大大","测试1","测试2"]
```

---

###文件上传

```
url: yoursite.com/typein/upload
method: "post"
```