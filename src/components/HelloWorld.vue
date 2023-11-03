<template>
  <div class="hello" v-loading="loading" element-loading-text="下载中...">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div class="form">
          <el-card class="box-card">
            <h2 style="margin: 30px 0;text-align: center">账号密码</h2>
            <el-input v-model="username" style="width: 200px;margin: 10px 0;" placeholder="请输入账号"></el-input>
            <br />
            <el-input placeholder="请输入密码" style="width: 200px;margin: 10px 0;" v-model="password"
              show-password></el-input>
            <br />
            <el-button style="margin: 30px" type="primary" @click="getToken">获取token</el-button>
            <br />
            <div v-if="!staut" class="Token Nois">Token状态:未获取</div>
            <div v-else class="Token">Token状态:已获取</div>
<!--            <h2 style="margin: 10px 0">文件路径值</h2>-->
<!--            <el-input v-model="route" style="width: 200px;margin: 10px 0;" placeholder="请输入路径"></el-input>-->
<!--            <br />-->
<!--            <el-button style="margin: 30px" type="primary" @click="getFile">获取Excel文件</el-button>-->
<!--            <br />-->
            <el-button style="margin: 30px" type="primary" @click="upFile">
              上传Excel文件</el-button>
          </el-card>

          <el-dialog title="上传文件"
                     width="45%"
                     :close-on-click-modal="false"
                     :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="状态" :label-width="formLabelWidth">
<!--multiple-->
                <el-select v-model="form.state"
                           class="input_c"
                           size="small"
                           placeholder="请选择状态">
                  <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>

              </el-form-item>
<!--              <el-form-item label="文件地址" :label-width="formLabelWidth">-->
<!--                <el-input v-model="form.fileDir"-->
<!--                          class="input_c"-->
<!--                          size="small"-->
<!--                          placeholder="请输入文件地址"-->
<!--                          autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item label="开始日期" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="form.startDate"
                    type="date"
                    class="input_c"
                    size="small"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="form.endDate"
                    type="date"
                    class="input_c"
                    size="small"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="上传" :label-width="formLabelWidth">
                <el-upload
                    class="upload-demo"
                    drag
                    :multiple="false"
                    :data="form"
                    ref="upload"
                    :limit="1"
                    accept=".xls,.xlsx,"
                    :auto-upload="false"
                    :on-success="onSuccess"
                    :on-error="onerrorFile"
                    :on-progress="onProgress"
                    :action="action">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </div>
          </el-dialog>

        </div>
      </div>
    </el-col>

  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      route: '',
      staut: false,
      Token: '',
      value1: "",
      value2: [],
      value3: "",//历史记录的日期选择器
      list: [],
      loading: false,
      historyList: [],
      form: {
        state: '',
        startDate: '',
        endDate: '',
        token: '',
        fileDir: ''
      },
      formLabelWidth: '150px',
      dialogFormVisible: false,
      action: this.$baseURL + '/importExcel',
      options: ['提交','通过','返修','暂停',],
    };
  },

  created() {
    // this.getList();
  },

  methods: {
    // 获取Token
    getToken() {
      if (this.username == "" || this.password == "") {
        this.$message({
          type: "info",
          message: "输入框不能为空",
        });
        return
      }

      let params = {
        email: this.username,
        password: this.password
      }
      this.$http({
        method: "get",
        url: "/getToken",
        params: params
      }).then((res) => {
        console.log(res);
        if (res.code == 200 && res.success == true) {
          if (res.result.success) {

            this.staut = res.result.success
            this.Token = res.result.message
            this.$message({
              type: "success",
              message: "获取Token成功",
            });

          } else {

            this.$message({
              type: "error",
              message: res.result.message,
            });
          }
        } else {

          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    submit() {
      this.$refs.upload.submit();
      this.dialogFormVisible = false;
    },
    onSuccess(response, file, fileList) {
      console.log("1111", response, file, fileList)
      this.$message({
        type: "success",
        message: response.message,
      });
    },
    onerrorFile(err, file, fileList) {
      console.log("--------", err, file, fileList)
      this.$message({
        type: "error",
        message: err.message,
      });
    },
    onProgress(event, file, fileList) {
      console.log("--------", event, file, fileList)
      this.loading = true;
      this.$message({
        type: "success",
        message: event.message,
      });
    },

    upFile() {
      console.log("====", this.$baseURL)
      // eslint-disable-next-line no-empty
      if (!this.staut) {
        return this.$message({
          type: "warning",
          message: "请先登录获取token!",
        });
      }
      this.dialogFormVisible = true;
      this.form.token = this.Token;


    },

    getFile() {
      if (this.route == "") {
        this.$message({
          type: "info",
          message: "输入框不能为空",
        });
        return
      }

      let params = {
        fileUrl: this.route,
        token: this.Token
      }
      this.$http({
        method: "get",
        url: "/getFile",
        params: params
      }).then((res) => {
        console.log(res);
        if (res.code == 200 && res.success == true) {

          const blob = new Blob([this.stringToBinary(res.result)]);

          // 创建文件下载链接
          let ObjectURL = URL.createObjectURL(blob);
          console.log(ObjectURL)

          const link = document.createElement('a');
          link.style.display = 'none';
          document.body.appendChild(link); // Firefox workaround, see #6594
          link.href = ObjectURL
          let now = new Date().valueOf()


          link.download = '列表' + this.getDate(now) + '.xls';
          link.click();
        } else {

          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },


    getDate(timestamp) {

      // 此处时间戳以毫秒为单位
      let date = new Date(timestamp);
      let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
      let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      let GMT =  Moth + '-' + Day + '_' + Hour + '-' + Minute ;

      console.log(GMT)  // 2022-09-07 15:56:07
      return GMT
    },












    //时间戳转时间
    dateTime(time) {
      let date = new Date(time);
      const Y = date.getFullYear();
      const M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const D = date.getDate();

      const H = date.getHours(); // 小时
      const m = date.getMinutes(); // 分钟
      const s = date.getSeconds(); // 秒
      return `${Y}年${M}月${D}日--${H}时-${m}分-${s}秒`;
    },

    historyDateTime(time) {
      let date = new Date(time);
      const M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const D = date.getDate();

      const H = date.getHours(); // 小时
      const m = date.getMinutes(); // 分钟
      // const s = date.getSeconds(); // 秒
      return `${M}月${D}日${H}时-${m}分`;
    },

    // 设置下一场游戏
    setGame() {
      let params = {
        nextTime: this.value1,
      };

      this.$confirm(
        "确认时间为" + this.dateTime(this.value1) + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$http({
            method: "post",
            url: "/ma/game/setNextStartTime",
            params: params,
          }).then((res) => {
            console.log(res);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "添加场次成功!",
              });
              this.getList();
            } else if (res.code == 511) {
              this.$message({
                type: "error",
                message: res.message,
              });
            } else if (res.code == 522) {
              this.$message({
                type: "error",
                message: res.message,
              });
            } else {
              this.$message({
                type: "error",
                message: "添加场次失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    // 设置下一场游戏
    setNextGame(num) {
      if (this.list.length == 0) {
        return this.$alert(
          "查询不到上一场信息",
          "提示",
          {
            type: "info",
          }
        );
      }
      let valueArr = this.list.slice(-1);
      let value = valueArr[0].gameStartTime + num;
      console.log(value, this.value1);
      let params = {
        nextTime: value,
      };

      this.$confirm(
        "确认时间为" + this.dateTime(value) + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$http({
            method: "post",
            url: "/ma/game/setNextStartTime",
            params: params,
          }).then((res) => {
            console.log(res);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "添加场次成功!",
              });
              this.getList();
            } else if (res.code == 511) {
              this.$message({
                type: "error",
                message: res.message,
              });
            } else if (res.code == 522) {
              this.$message({
                type: "error",
                message: res.message,
              });
            } else {
              this.$message({
                type: "error",
                message: "添加场次失败!",
              });
            }

          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    // 设置时间段
    setTimeGame() {
      let params = {
        startTime: this.value2[0],
        endTime: this.value2[1]
      };

      console.log(params.startTime, params.endTime, this.dateTime(this.value2[0]), this.dateTime(this.value2[1]))
      this.$confirm(
        "起始时间为" + this.dateTime(this.value2[0]) + "<br/ >结束时间为" + this.dateTime(this.value2[1]) + ",是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true
          this.$http({
            method: "post",
            url: "/ma/game/setGameByTimeSlot",
            params: params,
          }).then((res) => {
            console.log(res);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "添加场次成功!",
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: res.message,
              });
            }
            this.loading = false
            this.value2 = ""
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    // 删除某个场次
    deleteGame(gameId) {
      console.log(gameId);
      this.$confirm("是否确认删除这个场次?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            gameId: gameId,
          };
          this.$http({
            method: "post",
            url: "/ma/game/removeGameById",
            params: params,
          }).then((res) => {
            console.log(res);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: "删除场次失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    // 删除全部场次
    deleteWholeGame() {
      this.$confirm("是否确认删除全部的场次?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true

          this.$http({
            method: "post",
            url: "/ma/game/removeAllGames",
          }).then((res) => {
            console.log(res);
            if (res.code == 200 && res.success == true) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: "删除场次失败!",
              });
            }

            this.loading = false
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    // 修改历史记录日期
    changeHistoryDay(val) {
      console.log(val)
      let params = {
        time: val
      }
      this.$http({
        method: "get",
        url: "/ma/gameParticipants/getGameInfoByDayNum",
        params: params,
      }).then((res) => {
        console.log(res.result);
        this.historyList = res.result

      });

    },
    // 解码转二进制流
    stringToBinary(result) {
      const binaryString = atob(result);


      // 创建Uint8Array数组来存储二进制数据
      const decodedString = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        decodedString[i] = binaryString.charCodeAt(i);
      }
      return decodedString;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hello {
  display: flex;
  justify-content: center;
  padding: 100px;

  .form {

    .box-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .Token {

        padding: 10px;
        background-color: #09ff00;
        border-radius: 10px;
        text-align: center;
      }

      .Nois {
        background-color: #ff0000;
      }
    }
  }

  .list {
    padding-left: 100px;

    .box-card {
      padding: 50px;
      text-align: center;

      .el-card__body {
        height: 600px;
      }

      .el-scrollbar__bar.is-vertical {
        opacity: 1;
      }

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;

        .text {
          margin-right: 20px;
        }
      }
    }
  }

  .history {
    .box-card {
      padding: 50px;
      text-align: center;

      .el-card__body {
        height: 600px;
      }

      .el-scrollbar__bar.is-vertical {
        opacity: 1;
      }

      .item {
        display: flex;

        .itemList {
          display: flex;
        }

      }
    }
  }
}
.input_c{
  width: 75% !important;
}
.el-card__body{
  text-align: center;
}
</style>
