const xhr = new XMLHttpRequest();

export default function upload(action,options){

    bindEvent();
    const formData = new FormData();

    if(options.data){
        Object.entries(options.data).forEach((key,value)=>{
            formData.append(key,value);
        });
    }

    formData.append(options.filename,options.file);
    xhr.open("post", action,true);
    xhr.send(formData);


}

function getError(action,ajax){
    const msg = `${ajax.method + action}操作失败，status:${ajax.statusText}`;
    const err = new Error(msg);
    err.url = action;
    return err;
}

function bindEvent(){
    xhr.upload.onprogress = function updateProgress(e){
        if(e.lengthComputable){
            e.percent = e.loaded/e.total*100;
            if(options.onProgress) options.onProgress(e);
        }
    };
    /*
    xhr.upload.onload = function uploadSuccess(e){
        if(options.onuploadSuccess) options.onuploadSuccess(e.target.result);
    };
    */

    xhr.onload = function onload(){
        if(xhr.status<200 ||(xhr.status>=300 && xhr.status!== 304))
            if(options.onError)
                options.onError(getError(action,xhr));
        else
            options.onSuccess(getResponseBody(xhr));
    }


}
