

export default function upload(action,options){

    let promise = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function updateProgress(e){
            if(e.lengthComputable){
                e.percent = e.loaded/e.total*100;
                if(options.onProgress) options.onProgress(e);
            }
        };

        xhr.onload = function onload(){
            if(xhr.status<200 ||(xhr.status>=300 && xhr.status!== 304))
                reject(getError(action,xhr));
                // if(options.onError)
                //     options.onError();
            else
                resolve(getResponseBody(xhr));
                // options.onSuccess(getResponseBody(xhr));
        }

        // bindEvent(xhr,resolve,reject);
        const formData = new FormData();

        if(options.data){
            Object.entries(options.data).forEach((key,value)=>{
                formData.append(key,value);
            });
        }

        formData.append(options.filename,options.file);
        xhr.open("post", action,true);
        xhr.send(formData);
    });

    return promise;



}

function getError(action,xhr){
    const msg = `${xhr.method + action}操作失败，status:${xhr.statusText}`;
    const err = new Error(msg);
    err.url = action;
    return err;
}

function getResponseBody(xhr){
    //默认值""
    const responseBody = xhr.response||xhr.responseText;

    //防止response json解析有误
    if(!responseBody) return responseBody;

    try{
        return JSON.parse(responseBody);
    }catch(err){
        return responseBody;
    }
}

function bindEvent(xhr){

    /*
    xhr.upload.onload = function uploadSuccess(e){
        if(options.onuploadSuccess) options.onuploadSuccess(e.target.result);
    };
    */




}
