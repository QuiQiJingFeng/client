"use strict";

var protobuf = require("protobuf");
var network = {};

network.Init = function () {
    var self = this;
    self.socket = null;
    self.event_dispatcher = require("event_dispatcher")();
    self.event_dispatcher.Init();
    protobuf.Init();
};

network.Connect = function (call_back) {
    var self = this;
    var url = "ws://127.0.0.1:8888";
    if (self.socket) {
        call_back();
        return;
    }
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        if (call_back) call_back();
    };

    self.socket.onerror = function (event) {
        self.DisConnect();
    };

    self.socket.onclose = function (event) {
        self.DisConnect();
    };

    self.socket.onmessage = function (event) {
        if (cc.sys.isNative) {
            var msg = protobuf.decode(event.data);
            var obj = JSON.parse(msg);
            var event_name = Object.keys(obj)[0];
            self.DispatchEvent(event_name, obj[event_name]);
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function (progressEvent) {
                var msg = protobuf.decode(this.result);
                var obj = JSON.parse(msg);
                var event_name = Object.keys(obj)[0];
                self.DispatchEvent(event_name, obj[event_name]);
            };
            fileReader.readAsArrayBuffer(event.data);
        }
    };
};

network.DisConnect = function () {
    var self = this;
    self.socket.close();
    self.socket = null;
};

network.Send = function (msg) {
    var self = this;
    self.Connect(function () {
        cc.log("111111111");
        var buffer = protobuf.encode(msg);
        self.socket.send(buffer);
    });
};

network.RegisterEvent = function (event_name, handle) {
    var self = this;
    self.event_dispatcher.RegisterEvent(event_name, handle);
};

network.DispatchEvent = function (event_name, data) {
    var self = this;
    self.event_dispatcher.DispatchEvent(event_name, data);
};

module.exports = network;