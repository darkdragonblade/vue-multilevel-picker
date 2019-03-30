// import picker from './picker';
// import multilevelPicker from './multilevelPicker';
// import Vue from 'vue';

// let pickerComponent = Vue.extend(picker);
// let instance;
// const install = () => {
//   Vue.component('multilevelPicker',multilevelPicker);
//   Object.defineProperty(Vue.prototype, '$showPicker', {
//     get () {
//       const showPicker = options => {
//         instance = new pickerComponent()
//         instance.vm = instance.$mount()
//         document.body.appendChild(instance.vm.$el);
//         instance.vm.showPicker();
//       }
//       return showPicker
//     }
//   })
//   Object.defineProperty(Vue.prototype, '$colsePicker', {
//     get () {
//       const showPicker = options => {
//         instance = new pickerComponent()
//         instance.vm = instance.$mount()
//         document.body.appendChild(instance.vm.$el);
//         instance.vm.showPicker();
//       }
//       return showPicker
//     }
//   })
// }
// export default install;