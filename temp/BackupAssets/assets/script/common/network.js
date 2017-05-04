let protobuf = require("protobuf");

let network = {};

network.Init = function() {
    let self = this;
    self.socket = null;

    protobuf.Init();

    if(cc.sys.isNative) {
        window.io = SocketIO;
    } else {
        require("socket.io");
    }

    self.Connect();
}

network.Connect = function() {
    console.log("FYD=====CONNECT");
    let self = this;
    let url = "127.0.0.1:8888";
    self.socket = io(url);
    self.socket.on('connected',function(msg) {
        console.log("Connected---------",url);
    });
    self.socket.on('msg',function(buffer){
        let msg = protobuf.decode(buffer);
        cc.log("data=>",JSON.stringify(msg));
    });

    self.socket.on('disconnect', function() {
        console.log("与服务其断开");
    });

}

network.DisConnect = function() {
    let self = this;
}

network.Send = function(msg) {
    let self = this;
    if(!self.socket) return;
    let buffer = protobuf.encode(msg);
    self.socket.emit(buffer);
}
module.exports = network;