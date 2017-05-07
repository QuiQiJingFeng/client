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
            var _obj = JSON.parse(msg);
            var event_name = Object.keys(_obj)[0];
            self: DispatchEvent(event_name, _obj[event_name]);
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function (progressEvent) {
                var self = this;
                var msg = protobuf.decode(self.result);
                var obj = JSON.parse(msg);
                var event_name = Object.keys(obj)[0];
                self: DispatchEvent(event_name, obj[event_name]);
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

network.RegisterEvent = function (event_name, handle) {
    var self = this;
    self.event_dispatcher.RegisterEvent(event_name, handle);
};

network.DispatchEvent = function (event_name, data) {
    var self = this;
    self.event_dispatcher.DispatchEvent(event_name, obj[event_name]);
};

module.exports = network;