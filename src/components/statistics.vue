<template>
<div class="box-c">
  <h1>调研统计</h1>
  <div>
    <span class="span-c">
      调研分类 :
    </span>
    <el-select v-model="type"
               class="val-c"
               size="small"
               @change="getRadio"
               clearable
               placeholder="请选择调研分类">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <span class="span-c">
      调研分组 :
    </span>
    <el-input v-model="surveyGroup"
              size="small"
              class="val-c"
              type="number"
              placeholder="请输入调研分组" @keyup.enter.native="getRadio">

    </el-input>
    <el-button type="primary" size="small" @click="clearVal">清空</el-button>
    <el-button type="primary" size="small" @click="getRadio">查询</el-button>
<!--    <el-select v-model="surveyGroup"-->
<!--               size="small"-->
<!--               @change="getRadio"-->
<!--               placeholder="请选择调研分组">-->
<!--      <el-option-->
<!--          v-for="item in option1"-->
<!--          :key="item"-->
<!--          :label="item"-->
<!--          :value="item">-->
<!--      </el-option>-->
<!--    </el-select>-->
  </div>

  <div class="table-div">
    <h2>问题1</h2>
    <el-table
        :data="tableData"
        key="1"
        border
        class="table-c">
      <el-table-column
          prop="radio"
          label="选项"
          width="180">
        <template slot-scope="scope">
          {{typeData[parseInt(scope.row.radio)-1]}}
        </template>
      </el-table-column>
      <el-table-column
          prop="radioCount"
          label="选项总数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="radioPercentage"
          label="百分比(%)">
      </el-table-column>
    </el-table>
    <h2>问题2</h2>
    <el-table
        :data="tableData1"
        key="2"
        border
        class="table-c">
      <el-table-column
          prop="radio"
          label="选项"
          width="180">
        <template slot-scope="scope">
          {{typeData[parseInt(scope.row.radio)-1]}}
        </template>
      </el-table-column>
      <el-table-column
          prop="radioCount"
          label="选项总数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="radioPercentage"
          label="百分比(%)">
      </el-table-column>
    </el-table>
  </div>
  <h3>
    有效用户:
    <el-tag size="small"
            style="margin-right: 5px"
            v-for="item in userList" :key="item">{{item
      }}</el-tag>
  </h3>
  <br>
  <h3>
    有效问卷量: {{size}}
  </h3>

</div>
</template>

<script>
export default {
  name: "statistics",
  data() {
    return {
      tableData: [],
      tableData1: [],
      type: '1',
      surveyGroup: '',
      options:[
        {
          label: '小模型 VS. 大模型',
          value: '1'
        },
        {
          label: '小模型 VS. groundtruth',
          value: '2'
        },
        {
          label: '小模型 VS. motiondiffuse',
          value: '3'
        },
        {
          label: '小模型 VS. mdm',
          value: '4'
        }
      ],
      option1: ['1', '2', '3', '4', '5'],
      typeData: ['小模型', '大模型', '小模型(mdm)', 'mdm', 'motiondiffuse',
        'groundtruth'],
      userList: [],
      size: ''
    }
  },
  created() {
  },
  mounted() {
    this.getRadio();
  },
  methods: {
    clearVal() {
      this.type = '';
      this.surveyGroup = '';
      this.getRadio();
    },
    getRadio() {
      let params = {
        type: this.type,
        surveyGroup: this.surveyGroup
      }
      this.$http({
        method: "get",
        url: "/exUser/getRadio",
        params: params
      }).then((res) => {
        console.log(111, res)
        if (res.code == 200) {
          this.tableData = res.data.radio1;
          this.tableData1 = res.data.radio2;
          this.getData();
        }

      })
    },
    getData() {
      let params = {
        type: this.type,
        surveyGroup: this.surveyGroup
      }
      this.$http({
        method: "get",
        url: "/exUser/getData",
        params: params
      }).then((res) => {
        console.log(111, res)
        if (res.code == 200) {
          this.userList = res.data.list;
          this.size = res.data.size;
        }

      })
    }
  }

}
</script>

<style scoped>
.box-c {
  padding: 20px 15vw ;
  width: 75vw;
  text-align: center;
}
.span-c{

}
.val-c{
  margin: 0 15px;
  width: 200px;
}
.table-c{
  width: 600px;
  display: block;
  margin: 20px auto;
}
.table-div{

}
h1{
  font-size: 24px;
  font-weight: 600;
  margin: 15px 0;
}
h2{
  font-size: 20px;
  font-weight: 500;
  margin: 15px 0;
}
</style>
