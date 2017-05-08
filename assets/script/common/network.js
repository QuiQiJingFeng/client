let protobuf = require("protobuf");
let network = {};

network.Init = function() {
    let self = this;
    self.socket = null;
    self.event_dispatcher = require("event_dispatcher")();
    self.event_dispatcher.Init();
    protobuf.Init();
}

network.Connect = function(call_back) {
    let self = this;
    let url = "ws://127.0.0.1:8888";
    if(self.socket) {
        return call_back();
    }
    self.socket = new WebSocket(url);
    self.socket.onopen = function (event) {
        if(call_back)
            call_back();
    };

    self.socket.onerror = function (event) {
        self.DisConnect();
    };

    self.socket.onclose = function (event) {
        self.DisConnect();
    };
    
    self.socket.onmessage = function (event) {
        if(cc.sys.isNative) {
            let msg = protobuf.decode(event.data);
            let obj = JSON.parse(msg);
            let event_name = Object.keys(obj)[0];
            self.DispatchEvent(event_name,obj[event_name]);
        }else {
            var fileReader = new FileReader();  
            fileReader.onload  = function(progressEvent) { 
                let msg = protobuf.decode(this.result);  
                let obj = JSON.parse(msg);
                let event_name = Object.keys(obj)[0];
                self.DispatchEvent(event_name,obj[event_name]);
            };  
            fileReader.readAsArrayBuffer(event.data); 
        }
    };
}

network.DisConnect = function() {
    let self = this;
    self.socket.close();
    self.socket = null; 
}

network.Send = function(msg) {
    let self = this;
    self.Connect(function(){
        let buffer = protobuf.encode(msg);
        self.socket.send(buffer);
    });
}

network.RegisterEvent = function(event_name,handle) {
    let self = this;
    self.event_dispatcher.RegisterEvent(event_name,handle);
}

network.DispatchEvent = function(event_name,data) {
    let self = this;
    self.event_dispatcher.DispatchEvent(event_name,data);
}

module.exports = network;
