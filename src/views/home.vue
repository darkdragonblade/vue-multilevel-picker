<template>
  <div class="home">
    <multilevel @done="done" @change="change" :data="data" :column="'3'"></multilevel>
     <!--<div id="div1">asd</div>-->
  </div>
</template>

<script>
import cityData from '../../static/city-data.json';
export default {
  name: 'home',
  data () {
    return {
     data:''
    }
    
  },
  mounted() {
    this.data = cityData;
  //   var o = document.getElementById("div1");
  // // 动画开始时事件
  // o.addEventListener("webkitAnimationStart", function() {
  //     console.log("动画开始");
  // })
  // // 动画重复运动时事件
  // o.addEventListener("webkitAnimationIteration", function() {
  //     console.log("动画重复运动");
  // })
  // // 动画结束时事件
  // o.addEventListener("webkitAnimationEnd", function() {
  //     console.log("动画结束");
  // })
  },
  methods: {
    change(data){
     
    },
    done(data){
      
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#div1{
  animation:mymove 2s infinite 
}
@keyframes mymove
{
from {margin-top:0px;}
to {margin-top:200px;}
}
</style>
