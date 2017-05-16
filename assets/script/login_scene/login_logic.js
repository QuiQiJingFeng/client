let login_logic = {};

login_logic.Init = function() {
    let self = this;
    self.RegisterNetEvent();
    self.RegisterLogicEvent();
    self.account = null;
    self.password = null;
    self.login_path = "http://127.0.0.1:3000/login";
    self.register_path = "http://127.0.0.1:3000/register";
    self.server_list_path = "http://127.0.0.1:3000/server_list.js"
}

login_logic.RegisterNetEvent = function() {
   appNet.RegisterEvent("login_ret",function(data) {
        //load new scene
        cc.log("login success");
        appEvent.DispatchEvent("LOGIN_VIEW_MODE","HIDE_LODING");
        cc.director.loadScene('loading_scene');
        
   });
}

login_logic.RegisterLogicEvent = function() {
    let self = this;

    appEvent.RegisterEvent("LOGIN_LOGIC",function(type,data){
        switch(type) {
            case "MU77LOGIN":{
                self.Mu77Login(data);
            }break;
            case "MU77REGISTER":{
                self.Mu77Register(data);
            }break;
            case "LOGINSERVER":{
                self.LoginServer();
            }break;
        }
    });
}

login_logic.LoginServer = function() {
        let self = this;
        let data = {}
        
        data.account = self.account;
        data.password = self.password;
        data.version = "1.0.0";
        data.server_id = 1;
        data.locale = "zh-CN";
        data.platform = appUtils.GetPlatform();
        data.channel = "mu77";
        data.device_type = "MI4";
        data.net_mode = "3G";


        
        let send_msg = {login:data};
        appNet.Send(send_msg);
}

login_logic.Mu77Login = function(msg) {
        let self = this;
        self.account = msg.account;
        self.password = msg.password;
        let post_data = {"action":"login","account":msg.account,"password":msg.password};
        appUtils.SendPostRequest(self.login_path,post_data,function(content){
            let value = JSON.parse(content);
            if(value.result == "success") {
                appEvent.DispatchEvent("LOGIN_VIEW_MODE","SERVER_LIST");
            }else {
                //TODO 显示提示  登陆失败
            }
        });
}

login_logic.Mu77Register = function(msg) {
        let self = this;
        self.account = msg.account;
        self.password = msg.password;
        let result = false;
        let post_data = {"action":"register","account":msg.account,"password":msg.password};
        appUtils.SendPostRequest(self.register_path,post_data,function(content){
            let value = JSON.parse(content);
            if(value.result == "success") {
                appEvent.DispatchEvent("LOGIN_VIEW_MODE","SERVER_LIST");
            }else {
                //TODO 显示提示  注册失败
            }
        });
}

login_logic.GetServerList = function(call_back) {
        let self = this;
        appUtils.SendGetRequest(self.server_list_path,function(content){
            let value = JSON.parse(content);
            call_back(value);
        });
}

module.exports = login_logic;











