"use strict";

var protobuf = require("protobuf");

var network = {};

network.Init = function () {
    var self = this;
    self.socket = null;

    protobuf.Init();

    if (cc.sys.isNative) {
        window.io = SocketIO;
    } else {
        require("socket.io");
    }

    self.Connect();
};

network.Connect = function () {
    var self = this;
    var url = "127.0.0.1:8888";
    self.socket = io(url);
    self.socket.on('connected', function (msg) {
        console.log("Connected---------", url);
    });
    self.socket.on('msg', function (data) {
        console.log('receive data ==>', data);
    });

    self.socket.on('disconnect', function () {
        console.log("与服务其断开");
    });
};

network.DisConnect = function () {
    var self = this;
};

network.Send = function (msg) {
    var self = this;
    if (!self.socket) return;
    var buffer = protobuf.encode(msg);
    self.socket.emit(buffer);
};
module.exports = network;