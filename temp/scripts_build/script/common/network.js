"use strict";
cc._RFpush(module, '4d5e0vb035DOq9h1lSDyPo/', 'network');
// script/common/network.js

"use strict";

var protobuf = require("protobuf");
var event_dispatcher = require("event_dispatcher");
var network = {};

network.Init = function () {
    var self = this;
    self.socket = null;

    protobuf.Init();

    self.Connect();
};

network.Connect = function () {
    var self = this;
    var url = "ws://192.168.1.100:8888";
    if (self.socket) return;
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        cc.log("onopen");
    };

    self.socket.onerror = function (event) {
        cc.log("-------------onerror", event);
    };

    self.socket.onclose = function (event) {
        console.log("---------------onclose", event);
    };

    self.socket.onmessage = function (event) {
        if (cc.sys.isNative) {
            var msg = protobuf.decode(event.data);
            var obj = JSON.parse(msg);
            var event_name = Object.keys(obj)[0];
            event_dispatcher.DispatchEvent(event_name, obj[event_name]);
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function (progressEvent) {
                var self = this;
                var msg = protobuf.decode(self.result);
                var obj = JSON.parse(msg);
                var event_name = Object.keys(obj)[0];
                event_dispatcher.DispatchEvent(event_name, obj[event_name]);
            };
            fileReader.readAsArrayBuffer(event.data);
        }
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