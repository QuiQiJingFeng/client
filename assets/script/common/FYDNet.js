let FYDNet = {};

FYDNet.Init = function() {
    let self = this;
    self.socket = undefined;
}

FYDNet.Connect = function(call_back) {
    let self = this;    
    if(self.socket) {
        return call_back();
    }
    let url = "ws://127.0.0.1:8888";
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
            let msg = app.Proto.decode(event.data);
            let obj = JSON.parse(msg);
            let event_name = Object.keys(obj)[0];
            app.Event.DispatchEvent(event_name,obj[event_name]);
        }else {
            var fileReader = new FileReader();  
            fileReader.onload  = function(progressEvent) { 
                let msg = app.Proto.decode(this.result);  
                let obj = JSON.parse(msg);
                let event_name = Object.keys(obj)[0];
                app.Event.DispatchEvent(event_name,obj[event_name]);
            };  
            fileReader.readAsArrayBuffer(event.data); 
        }
    };
}

FYDNet.DisConnect = function() {
    let self = this;
    if(self.socket) {
        self.socket.close();
        self.socket = undefined; 
    }
}

FYDNet.Send = function(msg) {
    let self = this;
    self.Connect(function(){
        let buffer = app.Proto.encode(msg);
        self.socket.send(buffer);
    });
}

FYDNet.RegisterEvent = function(event_name,handle) {
    let self = this;
    app.Event.RegisterEvent(event_name,handle);
}

module.exports = FYDNet;
