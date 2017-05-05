"use strict";
cc._RFpush(module, '4d5e0vb035DOq9h1lSDyPo/', 'network');
// script/common/network.js

"use strict";

var protobuf = require("protobuf");

var network = {};

network.Init = function () {
    var self = this;
    self.socket = null;

    protobuf.Init();

    self.Connect();
};

network.Connect = function () {
    console.log("FYD=====CONNECT");
    var self = this;
    var url = "ws://127.0.0.1:8888";
    if (self.socket) return;
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        console.log("onopen");
    };

    // GSocket.onerror = function (event) {
    self.socket.onerror = function (event) {
        console.log("-------------onerror", event);
    };

    // GSocket.onclose = function (event) {
    self.socket.onclose = function (event) {
        console.log("---------------onclose", event);
    };
    //需要判断是原生环境还是浏览器环境，如果是浏览器环境websocket收到的data将是BLOB类型，需要将BLOB类型转换为ArrayBuffer
    // GSocket.onmessage = function (event) {
    self.socket.onmessage = function (event) {
        console.log("onmessage>>>>>>>>>>>>>", event.data);
        // console.log(event);
        // let msg = protobuf.decode(buffer);
        // cc.log("data=>",JSON.stringify(msg));
        var fileReader = new FileReader();
        fileReader.onload = function (progressEvent) {
            var arrayBuffer = this.result; // arrayBuffer即为blob对应的arrayBuffer 
            var msg = protobuf.decode(arrayBuffer);
            cc.log("data=>", JSON.stringify(msg));
        };
        fileReader.readAsArrayBuffer(event.data);
    };
};

network.DisConnect = function () {
    var self = this;
};

network.Send = function (msg) {
    var self = this;
    if (!self.socket) return;
    var buffer = protobuf.encode(msg);
    self.socket.send(buffer);
};
module.exports = network;

cc._RFpop();