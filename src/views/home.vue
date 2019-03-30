<template>
  <div class="home">
    <multilevel @change="change" :data="data" :column="'3'"></multilevel>
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
    this.data = cityData
  },
  methods: {
    change(data){
     
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
</style>
