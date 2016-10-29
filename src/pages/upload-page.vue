<template>
    <div class="upload-demo">
        <upload @onRemove="handleFileRemove" action="/myupload"
            @onSuccess= "handleFileSuccess"
            @onError= "handleFileError"
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
    handleFileSuccess(file){
        console.log("fileupload success");
    },
    handleFileError(file){
        console.log(file.name);
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
