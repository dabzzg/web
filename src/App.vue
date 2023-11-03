<template>
  <div id="app">
    <el-radio-group v-model="radio" class="radio_c">
      <el-radio-button label="1">小模型 vs. 大模型</el-radio-button>
      <el-radio-button label="2">小模型 vs. groundtruth</el-radio-button>
      <el-radio-button label="3">小模型 vs. motiondiffuse</el-radio-button>
      <el-radio-button label="4">小模型 vs. mdm</el-radio-button>
    </el-radio-group>
<!--    <HelloWorld ref="page" msg="Welcome to Your Vue.js App"/>-->
    <mdmVsSmall v-if="radio == 4"></mdmVsSmall>
    <page v-else-if="radio == 1"></page>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import page from './components/page.vue'
import mdmVsSmall from "./components/mdmVsSmall";
import {sendWebsocket} from "./utils/websocket";

export default {
  name: 'App',
  components: {
     page,
      mdmVsSmall
  },
  data() {
    return {
      radio: '1'
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
form,
input,
table,
tbody,
p,
th,
td {
  -webkit-text-size-adjust: none;
  margin: 0;
  padding: 0;
  border: none;
  -webkit-tap-highlight-color: transparent;
}

html {
  min-height: 100%;
}

img,
input,
button,
a,
select,
textarea {
  margin: 0;
  padding: 0;
  resize: none;
  border: none;
  outline: none;
}

ol,
ul {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
em {
  font-size: 100%;
  word-wrap: break-word;
  font-weight: normal;
  font-style: normal;
}

a:active,
a:focus {
  outline: none;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset !important;
}

*html {
  background-image: url(about:blank);
  background-attachment: fixed;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  color: #4c4948;
  text-decoration: none;
}

body::-webkit-scrollbar {
  display: none;
}
.radio_c{
  text-align: center;
  width: 100%;
}
</style>
