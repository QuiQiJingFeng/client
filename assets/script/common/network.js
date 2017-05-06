let protobuf = require("protobuf");
let event_dispatcher = require("event_dispatcher");
let network = {};

network.Init = function() {
    let self = this;
    self.socket = null;

    protobuf.Init();

    self.Connect();
}

network.Connect = function() {
    let self = this;
    let url = "ws://192.168.1.100:8888";
    if(self.socket) return;
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        cc.log("onopen");
    };

    self.socket.onerror = function (event) {
        cc.log("-------------onerror",event);
    };

    self.socket.onclose = function (event) {
        console.log("---------------onclose",event);
    };
    
    self.socket.onmessage = function (event) {
        if(cc.sys.isNative) {
            let msg = protobuf.decode(event.data);
            let obj = JSON.parse(msg);
            let event_name = Object.keys(obj)[0];
            event_dispatcher.DispatchEvent(event_name,obj[event_name]);
        }else {
                var fileReader = new FileReader();  
                fileReader.onload  = function(progressEvent) { 
                    let self = this; 
                    let msg = protobuf.decode(self.result);  
                    let obj = JSON.parse(msg);
                    let event_name = Object.keys(obj)[0];
                    event_dispatcher.DispatchEvent(event_name,obj[event_name]);
                };  
                fileReader.readAsArrayBuffer(event.data); 
        }
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
