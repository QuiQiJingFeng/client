let protobuf = require("protobuf");

let network = {};

network.Init = function() {
    let self = this;
    self.socket = null;

    protobuf.Init();

    self.Connect();
}

network.Connect = function() {
    console.log("FYD=====CONNECT");
    let self = this;
    let url = "ws://127.0.0.1:8888";
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        console.log("onopen");
    };

    // GSocket.onerror = function (event) {
    self.socket.onerror = function (event) {
        console.log("-------------onerror");
    };

    // GSocket.onclose = function (event) {
    self.socket.onclose = function (event) {
        console.log("---------------onclose");
    };

    // GSocket.onmessage = function (event) {
    self.socket.onmessage = function (event) {
        console.log("onmessage");
        console.log(event);
        // let msg = protobuf.decode(buffer);
        // cc.log("data=>",JSON.stringify(msg));
    };
}

network.DisConnect = function() {
    let self = this;
}

network.Send = function(msg) {
    let self = this;
    if(!self.socket) return;
    let buffer = protobuf.encode(msg);
    self.socket.send(buffer);
}
module.exports = network;
