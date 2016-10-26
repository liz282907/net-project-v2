<template>
    <div class="upload-demo">
        <upload></upload>
    </div>

</template>

<script>
import Upload from '../components/upload/upload';

export default {
  components: {
    "upload": Upload
  },
};
</script>

<style>
.upload-demo{
    width: 450px;
}
</style>
