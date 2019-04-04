<template>
    <div v-if="!distory">
    <div class="xx-picker-back-drop" v-if="openPicker" @click="cancel"></div>
    <div class="xx-picker-wrap-out" :class="{'xx-picker-wrap-active':openPicker}">
    <div class="xx-picker-toolbar">
        <div @click="cancel()">{{cancelText}}</div>
        <div @click="done()">{{doneText}}</div>
    </div>
    <div class="xx-picker-wrap">
        <div class="xx-above-highlight"></div>
        <div class="xx-columns">
            <columns @change="change" :updateArr="column" :column="item" v-for="(item,index) of columnArr" :key="index"></columns>
        </div>
        <div class="xx-below-highlight"></div> 
    </div>
    </div>
    </div>
</template>
<style>
    .xx-picker-back-drop{
        background:rgba(33,33,33,.4);
        height:100%;
        width:100%;
        left:0;
        top:0;
        bottom:0;
        right:0;
        position:fixed;
        z-index:1001;
    }
    .xx-picker-toolbar{
        padding:10px;
        display:flex;
        justify-content: space-between;
        color:#488aff; 
        font-weight:600;
        font-size:16px;
    }
    .xx-picker-wrap-out{
        position:fixed;
        bottom:0;
        transform: translate3d(0, 100%, 90px);
        height:240px;
        left:0;
        width:100%;
        background:#fff;
        z-index:1002;
        transition:all .2s ease-out;
    }
    .xx-picker-wrap-active{
        transform: translate3d(0, 0, 90px)
    }
    .xx-above-highlight{
        height:79px;
        width:100%;
        position:absolute;
        top:0;
        left:0;
        border-bottom:1px solid #ccc;
        transform: translateZ(90px);
        background :linear-gradient(0deg,rgba(255,255,255,.8) 20%,rgba(255,255,255,1));
        z-index:2003;
        pointer-events: none;
    }
    .xx-below-highlight{
        transform: translateZ(90px);
        height:95px;
        width:100%;
        position:absolute;
        bottom:0;
        left:0;
        border-top:1px solid #ccc;
        background :linear-gradient(180deg,rgba(255,255,255,.8) 20%,rgba(255,255,255,1));
        z-index:2003;
        pointer-events: none;
    }
    
    .xx-picker-wrap{
        transform: translate3d(0,0,0);
        display: flex;
        flex-direction: column;
        contain: strict;
        overflow: hidden;
        z-index: 10;
        width:100%;
        border-top:1px solid #ccc;
        height:215px;
    }
     .xx-columns{
        height: 215px;
        perspective: 1000px;
        display: flex;
        position: relative;
        justify-content: center;
        contain: strict;
        direction: ltr;
        overflow: hidden; 
    }
    .flex-start{
    justify-content: flex-start;
    }
    .flex-end{
        justify-content: flex-end;
    }
    .picker-opt-selected{
        font-size:18px;
    }
</style>
<script>
import  columns  from './columns';
export default {
    components: {
        columns
    },
  name:'picker',
  props :{
      cancelText:{
          type:String,
          default:'取消'
      },
      doneText:{
          type:String,
          default:'完成'
      }
  },
  data () {
    return {
        openPicker:false,
        distory:false,
        column:[],
        columnArr:[],
        columnText:[],
        parent:'',
    }
  },
  methods: {
      showPicker(){
          this.openPicker = true;
      },
      done(){
          this.openPicker = false;
          this.parent.done();
      },
      cancel(){
          this.openPicker = false;
      },
      change(data){
        
        if(data.refresh)
        {
            this.columnText.push(data);
        }
        else
        {
            for(let i = 0;i<this.columnText.length;i++)
            {
                if(this.columnText[i].timeStamp==data.timeStamp)
                {
                    this.columnText[i] = data;
                }
            }
        }
        this.parent.change(this.columnText);
      }
  }
}
</script>