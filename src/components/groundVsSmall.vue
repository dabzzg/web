<template>
<div style="text-align: center">
<!--  <video src="src/assets/video/samples/t2m_ca_unet_dim192_ckpt_e015/00.mp4"-->
<!--         autoplay="autoplay"-->
<!--         class="video"-->
<!--         ref="video">-->
<!--    <p>你的浏览器不支持video标签.</p>-->
<!--  </video>-->

  <p style="display: block;font-size: 32px;margin-top: 30px">
    用户调研
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

let a = '一个人举起左臂，左手朝脸边放东西。\n' +
    '一个人缓慢地直行。\n' +
    '一个人大幅度地上下移动手臂，然后前后移动\n' +
    '一个人慢慢后退\n' +
    '一个人用一只脚保持平衡，同时移动另一只脚，然后换脚。\n' +
    '一个男人正在打网球。\n' +
    '一个人双手举起，向一侧移动，向前弯曲并触碰他的脚。\n' +
    '双臂高举在空中跳舞。\n' +
    '一个人向前走，跌跌撞撞，然后继续向前走。\n' +
    '一个人斜着向后走\n' +
    '一个人向前走，又停下来。\n' +
    '一个人坐下来用手说话。\n' +
    '用手擦拭东西\n' +
    '一个人将右臂向外移动，而另一只手臂靠近臀部。然后，用双手做出铲动动作。\n' +
    '双臂伸向两侧，一个人向前走\n' +
    '一个人将右手举到脸上。\n' +
    '一个人在快速做开合跳。\n' +
    '这个人正在做开合跳。\n' +
    '一个男人举起双手，从右到左移动试图找到什么东西，然后放下。\n' +
    '一个人向前伸出右臂\n' +
    '人站着并伸展他们的三头肌\n' +
    '这个人正在将一些东西放入搅拌碗中。\n' +
    '一个人跳跃时，双腿分开，手臂向外摆动至头顶上方，然后再次落下。\n' +
    '一个人用双臂做手势。\n' +
    '一个人从3点钟位置顺时针走到11点钟位置。\n' +
    '一个人一边跳舞一边旋转。\n' +
    '一个人沿着顺时针方向走一圈，然后在开始的地方停下来。\n' +
    '一个人下降到地面并用四肢行走。\n' +
    '一个人斜着向前跑，然后旋转九十度并跑\n' +
    '一个人在行走时爬上一个台阶。\n' +
    '有人用双臂比划着这些韵律，我是一个小茶壶，“把我抱起来，把我倒出来”\n' +
    '一个人在两脚之间跳跃时将右腿踢两次，然后猛击右臂\n' +
    '一个人逆时针向后移动，同时用其壮举画一条线\n' +
    '一个人向前冲刺，然后四肢着地继续向前，然后站起来。\n' +
    '一个人弯下腰环顾四周。\n' +
    '一个人用右手挥手。\n' +
    '一个人逆时针走一圈。\n' +
    '转弯时从左向右运行并沿途增加速度。\n' +
    '一个人用左腿站立，将右腿向侧面、向后摆动，然后回到双腿站立的位置。\n' +
    '一个人缓慢地向前迈出稍微对角的一步\n' +
    '一个人向右转，从两侧向右走，然后向左走。\n' +
    '处于防御姿势的人先向右倾斜，然后向左倾斜。\n' +
    '一个人缓慢地向前走。\n' +
    '一个人向前走，然后转身走回来。\n' +
    '一名男子重新摆放架子上的物品，然后退后一步。\n' +
    '一个人跳跃\n' +
    '一个人正在用右手挥手。\n' +
    '有人右脚后退，然后坐下，双手放在膝盖上，肘部向外。\n' +
    '有人在跳舞，他们先拍手，然后左右移动手臂，同时前后移动脚\n' +
    '人站在t位置，双手交叉，然后返回t位置\n'
let b = a.split(/\n/);
let textObj = {};
for (let i = 0; i < 50; i++) {
  let val;
  if (i < 10){
    val = '0' + i;

  }else {
    val = ''+i;
  }
  textObj[val] = b[i]
}



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
      textObj: textObj,
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
      for (let i = 20; i < 50; i++) {
        // if (i < 10){
        //   a.push('0' + i);
        // }else {
        //   a.push(''+i);
        // }
        a.push(''+i);
      }
      return a;
    },
    disabledVal() {
      return !(this.radio && this.radio1);
    },
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
        userName: localStorage.getItem('username')
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
