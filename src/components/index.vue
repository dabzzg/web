<template>
<div>
<!--  <el-radio-group v-model="radio" class="radio_c" @change="changeVal">-->
<!--    <el-radio-button label="1">小模型 vs. 大模型</el-radio-button>-->
<!--    <el-radio-button label="2">小模型 vs. groundtruth</el-radio-button>-->
<!--    <el-radio-button label="3">小模型 vs. motiondiffuse</el-radio-button>-->
<!--    <el-radio-button label="4">小模型 vs. mdm</el-radio-button>-->
<!--  </el-radio-group>-->
  <router-view/>
</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      radio: '1'
    }
  },
  mounted() {
  },
  created() {
    // if (this.$route.name == 'bigVsSmall'){
    //   this.radio = 1;
    // }else if (this.$route.name == 'groundVsSmall'){
    //   this.radio = 2;
    // }else if (this.$route.name == 'motiondiffuseVsSmall'){
    //   this.radio = 3;
    // }else if (this.$route.name == 'mdmVsSmall'){
    //   this.radio = 4;
    // }




  },
  methods:{
    changeVal(val) {
      if (val == '1'){
        this.$router.push({name: 'bigVsSmall'})
      }else if (val == '2'){
        this.$router.push({name: 'groundVsSmall'})
      }else if (val == '3'){
        this.$router.push({name: 'motiondiffuseVsSmall'})
      }else if (val == '4'){
        this.$router.push({name: 'mdmVsSmall'})
      }
    }
  },
}
</script>

<style scoped>

</style>
