import { Message } from "element-ui";
let websock = null;
let messageCallback = null;
let errorCallback = null;
let wsUrl = ""; //请求地址
/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
// eslint-disable-next-line no-unused-vars
function websocketSend(agentData) {
  //心跳重连机制
  console.log(agentData)
  // 加延迟是为了尽量让ws连接状态变为OPEN
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    if (websock.readyState === websock.OPEN) {
      // websock.OPEN = 1
      // 发给后端的数据需要字符串化
      websock.send(JSON.stringify(agentData));
    }
    if (websock.readyState === websock.CLOSED) {
      // websock.CLOSED = 3
      console.log("websock.readyState=3");
      // Message.error("ws连接异常，请稍候重试");
      errorCallback();
    }
  }, 500);
}

// 初始化weosocket
function initWebSocket() {
  if (typeof WebSocket === "undefined") {
    Message.error("您的浏览器不支持WebSocket，无法获取数据");
    return false;
  }
  const requstWsUrl = wsUrl;
  console.log(11111, requstWsUrl)
  websock = new WebSocket(requstWsUrl);
  websock.onopen = function () {
    websocketOpen(); //连接成功
  };
  websock.onmessage = function (e) {
    websocketonmessage(e); //接收返回数据
  };
  websock.onerror = function () {
    // Message.error("ws连接异常，请稍候重试");
    errorCallback();
  };
  websock.onclose = function (e) {
    websocketclose(e);
  };
}
// 接收ws后端返回的数据
function websocketonmessage(e) {
  const data = JSON.parse(e.data);
  messageCallback(data);
}

// 建立ws连接
// eslint-disable-next-line no-unused-vars
function websocketOpen(e) {
  console.log("ws连接成功");
}
// 关闭ws连接
function websocketclose(e) {
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  console.log("e.code!== 1000表示非正常关闭>>>", e.code);
  if (e && e.code !== 1000) {
    // Message.error("ws连接异常，请稍候重试");
    errorCallback();
    // // 如果需要设置异常重连则可替换为下面的代码，自行进行测试
    // if (tryTime < 10) {
    //   setTimeout(function() {
    //    websock = null
    //    tryTime++
    //    initWebSocket()
    //    console.log(`第${tryTime}次重连`)
    //  }, 3 * 1000)
    //} else {
    //  Message.error('重连失败！请稍后重试')
    //}
  }
}

//发起websocket请求函数
//  * @param {string} url ws连接地址
//  * @param {Object} agentData 传给后台的参数
//  * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
//  * @param {function} errCallback ws连接错误的回调函数
export function sendWebsocket(url, agentData, successCallback, errCallback) {
  wsUrl = url;
  initWebSocket(); // 初始化
  messageCallback = successCallback;
  console.log('=======', successCallback)
  errorCallback = errCallback;
  websocketSend(agentData); //此方法是为了隔一段时间给后端发一个，保证一直活着
}

// 关闭websocket函数
export function closeWebsocket() {
  if (websock) {
    websock.close(); // 关闭websocket
    websock.onclose(); // 关闭websocket
  }
}
