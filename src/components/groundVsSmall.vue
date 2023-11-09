<template>
<div style="text-align: center">
<!--  <video src="src/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/00.mp4"-->
<!--         autoplay="autoplay"-->
<!--         class="video"-->
<!--         ref="video">-->
<!--    <p>你的浏览器不支持video标签.</p>-->
<!--  </video>-->

  <p style="display: block;font-size: 32px;margin-top: 30px">
    用户调研{{page}}
  </p>
  <p style="display: block;font-size: 24px;margin-top: 30px">
    当前用户: {{username}}
  </p>
  <el-button
      class="btn"
      size="small"
      style="margin-bottom: 15px;"
      @click="delUser"
      type="primary">
    清除用户
  </el-button>
<!--  <template v-if="okBtn">-->
<!--    -->
<!--  </template>-->

  <template v-if="okBtn">

    <p style="display: block;font-size: 24px;margin-bottom: 15px;">
      当前进度: ({{this.chooseData.length+1}}/30)
    </p>
    <br>

    <template v-if="pageIndex==1">
      <p style="display: block;font-size: 24px;margin-bottom: 15px;">
        1.两个动作中哪个动作更真实、自然，不像ai合成的
      </p>

      <!--    <el-radio-group v-model="radio" class="radios">-->
      <!--      <el-radio :label="leftRadio">左侧</el-radio>-->
      <!--      <el-radio :label="rightRadio">右侧</el-radio>-->
      <!--    </el-radio-group>-->
    </template>
    <template v-else>
      <p style="display: block;font-size: 24px;">
        动作描述 : {{ textObj[choose] }}
      </p>
      <br>
      <p style="display: block;font-size: 24px;margin-bottom: 15px;">
        2.两个动作中哪个动作更符合这个描述
      </p>


    </template>

    <div class="divc">
      <video loop autoplay
             ref="video"
             class="video"
             muted="muted"
             :src="leftVideo"></video>
      <video loop  autoplay
             ref="video"
             class="video"
             muted="muted"
             :src="rightVideo"></video>
    </div>
    <el-radio-group v-model="radio1" class="radios"
                    key="1"
                    v-if="pageIndex==2">
      <el-radio :label="leftRadio" border>左侧</el-radio>
      <el-radio :label="rightRadio" border>右侧</el-radio>
    </el-radio-group>
    <el-radio-group v-model="radio"
                    key="2"
                    class="radios" v-else>
      <el-radio :label="leftRadio" border>左侧</el-radio>
      <el-radio :label="rightRadio" border>右侧</el-radio>
    </el-radio-group>


    <el-button class="btn"
               type="primary"
               key="b1"
               v-if="numArr.length>=0&&pageIndex == 1"
               :disabled="!radio"
               @click="nextPage">
      下一题
    </el-button>
    <el-button class="btn"
               type="primary"
               key="b2"
               v-if="numArr.length>0&&pageIndex==2" :disabled="disabledVal"
               @click="getVideo(1)">
      下一个
    </el-button>
    <el-button
        class="btn"
        @click="saveObj(1)"
        type="primary"
        key="b3"
        :disabled="disabledVal" v-else-if="numArr.length==0&&pageIndex == 2">
      提交
    </el-button>
  </template>
  <template v-if="!okBtn">
    <p style="display: block;font-size: 24px;margin-top: 30px">
      调研完成
    </p>
  </template>



  <el-dialog title="填写用户名"
             :append-to-body="true"
             width="45%"
             :center="true"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="name">
        <el-input v-model="form.name"
                  placeholder="请输入用户名"
                  @keyup.enter.native="okSubmit"
                  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary"
                 size="small"
                 @click="okSubmit">确 定</el-button>
    </div>
  </el-dialog>



</div>
</template>

<script>
import {getData} from "../utils/data";


export default {
  name: "page",
  data(){
    return{
      path: 'src/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/01.mp4',
      radio: '',  //1小2大
      radio1: '',
      numArr: [],
      choose: '',
      leftVideo: '',
      rightVideo: '',
      leftRadio: '',
      rightRadio: '',
      textObj: getData(),
      chooseData: [],
      form: {
        name: ''
      },
      pageIndex: 1,
      dialogFormVisible: true,
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
      },
      okBtn: false,
      username: '',
    }
  },
  created() {
    this.dialogFormVisible = !localStorage.getItem('username');
    if (localStorage.getItem('username')){
      this.form.name = localStorage.getItem('username');
      this.checkName();
    }
  },
  mounted() {
    // this.$refs.video.play();
    this.username = localStorage.getItem('username') || '';
    // localStorage.setItem('cats', 1);
    // console.log(localStorage.getItem('cats'))
  },
  computed:{
    numList(){
      let a = [];
      for (let i = (30 * parseInt(this.page)); i < (30 *
          (parseInt(this.page)+1)); i++) {
        if (i < 10){
          a.push('0' + i);
        }else {
          a.push(''+i);
        }
      }
      return a;
    },
    disabledVal() {
      return !(this.radio && this.radio1);
    },
    page() {
      return this.$route.query.page;
    }
    // username() {
    //   return localStorage.getItem('username')
    // }
    // leftVideo() {
    //   return require('@/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/'
    //       + this.choose + '.mp4');
    // },
    // rightVideo() {
    //   return require('@/assets/video/samples/gt_motions/'
    //       + this.choose + '.mp4');
    // }
  },
  watch:{
    $route:{
      handler(val) {
        let a = ['1','2', '3', '4', '5']
        if (!this.$route.query.page || !a.includes(this.$route.query.page)) {
          this.$router.push({path: val.path, query: {page: '1'}})
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    saveData(val) {
      this.chooseData.push({
        name: this.choose,
        radio: this.radio,
        radio1: this.radio1
      })
      this.saveObj(val)
    },
    checkName() {
      let params = {
        name: this.form.name,
        type: '2',
        surveyGroup: this.page
      }
      this.$http({
        method: "get",
        url: "/exUser/get",
        params: params
      }).then((res) => {
        console.log(111, res)
        if (res.code == 200) {
          console.log("====", res.data.userName)
          localStorage.setItem('username', this.form.name);
          localStorage.setItem('userId', res.data.id);
          this.okBtn = true;

          if (res.data.data){
            this.chooseData = res.data.data;
            let a = [];
            this.chooseData.forEach(val => {
              a.push(val.topic)
            })
            this.numArr = this.diffArray(this.numList, a)

          }else {
            this.numArr = [...this.numList];
          }
          console.log(this.numArr)
          this.getVideo();


          this.username = localStorage.getItem('username');
          this.dialogFormVisible = false;
        }else {
          this.okBtn = false
          this.$message({
            showClose: true,
            message: res.msg || '用户名重复',
            type: 'warning'
          })
        }



      })
    },
    diffArray(arr1, arr2) {
      return arr1.filter(item => !arr2.includes(item));
    },
    saveObj(val){
      let params = {
        topic: this.choose,
        radio1: this.radio,
        radio2: this.radio1,
        type: '3',
        userName: localStorage.getItem('username'),
        userId: localStorage.getItem('userId'),
        surveyGroup: this.page
      }
      this.$http({
        method: "post",
        url: "/exData/add",
        params: params
      }).then((res) => {
        console.log(111, res)
        if (res.code == 200) {
          if (val) {
            this.submit();
          }
        }

      })
    },
    submit() {
      let params = {
        id: localStorage.getItem('userId'),
      }
      this.$http({
        method: "put",
        url: "/exUser/getOk",
        params: params
      }).then((res) => {
        if (res.code == 200){
          console.log(111, res)
          this.okBtn = false;
        }
      })
    },
    okSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!');

          this.checkName();



        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    delUser(){
      this.form.name = '';
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.username = '';
      this.dialogFormVisible = true;
      this.okBtn = true;
      this.chooseData = [];
      this.radio = '';
      this.radio1 = '';
    },
    nextPage(){
      this.pageIndex = 2;
    },
    getVideo(val){
      this.pageIndex = 1;
      if (val) {
        this.saveData();
      }
      console.log(this.chooseData)

      this.leftRadio = '';
      this.rightRadio = '';
      this.radio = '';
      this.radio1 = '';
      let length = this.numArr.length;
      // if ()
      let index = this.getRandomInt(length);
      this.choose = this.numArr[index];
      this.numArr.splice(index,1);
      // console.log(this.numArr, this.choose, index)
      this.leftOrRight();
    },
    leftOrRight() {
      this.$nextTick(() => {
        let index = this.getRandomInt(10);
        if (index>5) {
          this.leftVideo =
              require('@/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/'
                  + this.choose + '.mp4');
          this.rightVideo =
              require('@/assets/video/samples/gt_motions/'
                  + this.choose + '.mp4');
          this.leftRadio = 1;
          this.rightRadio = 6;
        }else {
          this.leftVideo =
              require('@/assets/video/samples/gt_motions/'
                  + this.choose + '.mp4');
          this.rightVideo =
              require('@/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/'
                  + this.choose + '.mp4');
          this.leftRadio = 6;
          this.rightRadio = 1;
        }
        setTimeout(() => {
          this.$refs.video.play()
        },200)

      })

    }
  }
}
</script>

<style scoped>

@media screen and (min-width: 800px) {
  .divc{
    width: 80%;
    display: flex;
    margin: 15px auto;
    justify-content: space-evenly;
    /*margin-top: 15px*/
  }
  .video{
    cursor: pointer;
    height: 300px;
  }
  .radios{
    width: 35%;
  }
}
@media screen and (min-width: 650px) and (max-width: 800px){
  .divc{
    width: 600px;
    display: flex;
    margin: 15px auto;
    padding-top: 10vh;
    justify-content: space-evenly;
    /*margin-top: 15px*/
  }
  .video{
    cursor: pointer;
    height: 300px;
  }
  .radios{
    width: 65%;
  }
}
@media screen and (max-width: 650px) {
  .divc{
    width: 400px;
    display: flex;
    margin: 15px auto;
    padding-top: 10vh;
    justify-content: space-evenly;
    /*margin-top: 15px*/
  }
  .video{
    cursor: pointer;
    height: 200px;
  }
}


.video{
  /*border: black 1px dashed;*/
  /*display: block;*/
}
.radios{
  display: flex;
  /*margin-top: 15px;*/
  font-size: 16px;
  margin: 5px auto;
  justify-content: space-between;

}
.btn{
  margin-top: 15px;
}
/deep/.el-dialog__body{
  padding: 0 25px!important;
}
/deep/.el-dialog__footer{
  padding: 0 20px 5px!important;
  display: flex;
  justify-content: end;
}
</style>
