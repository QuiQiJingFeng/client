let login_logic = {};

login_logic.Init = function() {
    let self = this;
    self.RegisterNetEvent();
    self.RegisterLogicEvent();

    self.login_path = "http://127.0.0.1:3000/";
    self.register_path = "http://127.0.0.1:3000/";
}

login_logic.RegisterNetEvent = function() {
   appNet.RegisterEvent("login_ret",function(data) {
        //,,,,,
        cc.log("login msg ->",JSON.stringify(data));
        
    });
}

login_logic.RegisterLogicEvent = function() {
    let self = this;
    appEvent.RegisterEvent("mu77_login",function(data){
        self.Mu77Login(data);
    });


    appEvent.RegisterEvent("mu77_register",function(data){
        self.Mu77Register(data);
    });
}

login_logic.Mu77Login = function(msg) {
        let self = this;
        self.data = msg;
        let post_data = JSON.stringify(msg)
        appUtils.SendPostRequest(self.login_path,post_data,function(content){
            let value = JSON.parse(content);
            if(value.result == "success") {
                appEvent.DispatchEvent("login_success",value)
            }else {
                appEvent.DispatchEvent("login_failure",value.result)
            }
        },function(status){
            cc.log(self.login_path,"request error:==>status = ",status);
        });
}

login_logic.Mu77Register = function(msg,call_back) {
        let self = this;
        let data = {} 
        data.account = msg.account;
        data.password = msg.password;

        let result = false;
        let post_data = JSON.stringify(data)
        appUtils.SendPostRequest(self.register_path,post_data,function(content){
            let value = JSON.parse(content);
            if(value.result == "success") {
                appEvent.DispatchEvent("login_success",value)
            }else {
                appEvent.DispatchEvent("login_failure",value.result)
            }
        },function(status){
            cc.log(self.login_path,"request error:==>status = ",status);
        });
}
 

module.exports = login_logic;


/*

        if(cc.sys.isNative){
            data.platform = cc.sys.platform;
        }else{
            data.platform = sys.os;         //browser windows android ios
        }
        data.version = "1.0.0";
        data.server_id = 1;
        data.device_id = "XEG-4L";
        data.device_type = "MI4";
        data.channel = data.login_type;
        data.locale = "zh-CN";
        data.net_mode = "3G";
        data.device_platform = "IOS";

        let send_msg = {login:data};
        appNet.Send(send_msg);
*/










