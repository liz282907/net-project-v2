<template>
    <div class="upload-demo">
        <upload @onRemove="handleFileRemove" action="/myupload"
            @onSuccess= "handleFileSuccess"
            @onError= "handleFileError"
            @onAllSuccess= "handleFilesSuccess"
            @onSomeError= "handleFilesError"
            @onProgress= "onFileUploadProgress" :multiple = "true"></upload>
    </div>

</template>

<script>
import Upload from '../components/upload/upload';

export default {
  components: {
    "upload": Upload
  },
  methods:{
    handleFileRemove(file){
        console.log(file.name);
    },
    handleFileSuccess(file,responseBody){
        console.log("fileupload success");
    },
    handleFileError(file,err){
        console.log(file.name);
    },
    handleFilesSuccess(fileList){
        console.log("全部文件上传成功 success");
    },
    handleFilesError(fileList){
        console.log("部分文件上传失败 success");
    },
    onFileUploadProgress(file){
        console.log(file.name);
    }
  }
};
</script>

<style>
.upload-demo{
    width: 450px;
}
</style>
