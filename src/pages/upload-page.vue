<template>
    <div class="upload-demo">
        <upload @onRemove="handleFileRemove" action="/myupload" :multiple = "true"></upload>
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
    }
  }
};
</script>

<style>
.upload-demo{
    width: 450px;
}
</style>
