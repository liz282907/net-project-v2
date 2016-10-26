<template>
  <div class="upload-wrapper">
    <input type="file" style="display:none" id="fileInput" ref="fileInput" multiple @change="handleChange">
    <div  @click="clickToChooseFile" for="fileInput">
      <p class="upload-icon"><i class="icon iconfont">&#xe60d;</i></p>
      <p class="upload-text">Click or drag file to this area to upload</p>
      <p class="upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
    </div>
    <ul :class="fileNameListClass">
      <li v-for="(fileObj,index) in fileObjList" :key="fileObj.file.name" class="uploadlist-item clearfix">
        <div class="">
            <i class="iconfont fujian">&#xf015b;</i>
            <span>{{fileObj.file.name}}</span>
            <i class="iconfont delete" @click="removeFile(fileObj.file)">&#xe606;</i>
        </div>
        <transition name="progress">
            <div :class="['progress-line', `progress-${fileObj.status}`]"
                  :style="{width: fileObj.percent}"
                  v-if="fileObj.percent!=='100%'"></div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFileIndex } from './util.js';

let loadedFileList = [];


export default {

  props: {
    action:{
      type : String,
      required: true
    },
    multiple: Boolean
  },
  data() {
    return {
      // files:[],
      fileObjList:[],
      loadedFileList:[]
      // fileStatus:[]     //normal, success

    };
  },

  computed:{
    fileNameList(){
      return this.fileObjList && this.fileObjList.map(obj=> obj.file.name);
    },
    fileNameListClass(){
      return [
        'upload-list',
        {'isShown': this.fileObjList.length>0}
      ]

    },
  },

  created(){
    // fileReader.onprogress(e=>{
    //   debugger;
    //   console.log(e.target.result);
    // })
  },

  methods:{
    clickToChooseFile(){
      this.$refs.fileInput.click();
    },

    handleChange(e){
      const files = e.target.files;
      if(!files || files.length<=0) return;

      this.handleFiles(files);
    },

    handleFiles(files){

      let nextFiles = Array.prototype.slice.call(files);
      if(!this.multiple) nextFiles = nextFiles.slice(0,1);

      /*新载入的文件*/
      const nextFileObjList = nextFiles.filter(file=>{
        return (loadedFileList.indexOf(file)===-1);
      }).map(file=>{
        return {file,status:'normal',percent:0};
      });

      if(!this.multiple)
        this.fileObjList = nextFileObjList;
      else
        this.fileObjList = [...this.fileObjList,...nextFileObjList];

      nextFileObjList.forEach(fileObj=>{
        const fileReader = new FileReader();
        fileReader.onprogress = updateProgress(fileObj);
        fileReader.onloadend = loadFileEnd(fileObj);
        fileReader.readAsDataURL(fileObj.file);

        function updateProgress(fileObj){
          return e=> fileObj.percent = (e.loaded/e.total)*100+'%';
        }
        function loadFileEnd(fileObj){
          return e=> {
            fileObj.percent = '100%';
            fileObj.status = 'success';
            loadedFileList.push(fileObj);

            const contents = e.target.result;
          }
        }


      });


    },

    validateFileType(){

    },
    removeFile(file){
      const index = getFileIndex(file,this.fileObjList);
      if(index!==-1){
        this.fileObjList.splice(index,1);
        //预留接口
        this.$emit('onRemove',file);
      }


    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">
/*@import './upload.scss';*/



</style>
