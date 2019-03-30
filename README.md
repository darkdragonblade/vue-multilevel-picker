## vue-multilevel-picker Vue 组件库 三级联动

# install
###### npm install --save-dev multilevel-picker
###### import multilevel from 'multilevel-picker';
###### Vue.use(multilevel)

# example

![example](https://github.com/darkdragonblade/vue-multilevel-picker/blob/master/static/example.gif?raw=true)

<multilevel @change="change" columns=2 separator="--" placeholder="请选择地址" :data="city-json"></multilevel>

## 附上JSON 下载地址
https://github.com/darkdragonblade/vue-multilevel-picker/blob/master/static/city-json.rar?raw=true

### github 地址
https://github.com/darkdragonblade/vue-multilevel-picker

### npm 包地址
https://www.npmjs.com/package/multilevel-picker

## 参数方法

|名称|类型|默认|描述
|---|---|---|---|
|change|function|无|数据改变时触发|
|columns|string|1|显示列数|
|separator|string|--|分隔符|
|placeholder|sring|请选择|无数据默认值|
|data|array|无|json数据(必填)|

###### 对你有用帮忙STAR一下喔~
