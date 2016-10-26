function getFileIndex(file,fileObjList){

    return fileObjList.length?fileObjList.map(fileObj=>fileObj.file).indexOf(file):-1;
}

export { getFileIndex };