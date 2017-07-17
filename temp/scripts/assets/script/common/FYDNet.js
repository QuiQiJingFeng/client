"use strict";
cc._RFpush(module, 'ad46faACnNB7pfk5pmx0/lX', 'FYDNet');
// script/common/FYDNet.js

"use strict";

var FYDNet = {};

FYDNet.Init = function () {
    var self = this;
    self.socket = undefined;
};

FYDNet.Connect = function (call_back) {
    var self = this;
    if (self.socket) {
        return call_back();
    }
    var url = "ws://127.0.0.1:8888";
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
            var msg = app.Proto.decode(event.data);
            var obj = JSON.parse(msg);
            var event_name = Object.keys(obj)[0];
            app.Event.DispatchEvent(event_name, obj[event_name]);
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function (progressEvent) {
                var msg = app.Proto.decode(this.result);
                var obj = JSON.parse(msg);
                var event_name = Object.keys(obj)[0];
                app.Event.DispatchEvent(event_name, obj[event_name]);
            };
            fileReader.readAsArrayBuffer(event.data);
        }
    };
};

FYDNet.DisConnect = function () {
    var self = this;
    if (self.socket) {
        self.socket.close();
        self.socket = undefined;
    }
};

FYDNet.Send = function (msg) {
    var self = this;
    self.Connect(function () {
        var buffer = app.Proto.encode(msg);
        self.socket.send(buffer);
    });
};

FYDNet.RegisterEvent = function (event_name, handle) {
    var self = this;
    app.Event.RegisterEvent(event_name, handle);
};

module.exports = FYDNet;

cc._RFpop();