function getFileIndex(file,fileObjList){

    return (fileObjList && fileObjList.length)?fileObjList.map(fileObj=>fileObj.file).indexOf(file):-1;
}

function isFile(obj){
    return obj.constructor.toString().match(/\s*(\w+)\(\)/)[1]==="File";
}




export default {
    getFileIndex,
    isFile
};