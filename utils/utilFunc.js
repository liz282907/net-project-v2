function arr2dict(arr,key){
    let dic = {};
    arr.reduce((prev,cur)=>{
        // let{ key,prop2 } = cur;
        prev[cur[key]] = cur
    },{})
}