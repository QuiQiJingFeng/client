cc.Class({
    extends: cc.Component,

    properties: {
        back_btn:    cc.Button,
        login_btn:   cc.Button,
        server_btn:  cc.Button
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        self.back_btn.node.on('click',self.BackBtn,self);
        self.login_btn.node.on('click',self.LoginBtn,self);
        self.server_btn.node.on('click',self.ServerBtn,self);
    },

    BackBtn: function() {
        appEvent.DispatchEvent("back_login");
    },

    LoginBtn: function() {
        let data = {}
        if(cc.sys.isNative){
            data.platform = cc.sys.platform;
        }else{
            data.platform = "cc.sys.os";         //browser windows android ios
        }
        let msg = require("login_logic");
        

        data.account = msg.data.account;
        data.password = msg.data.password;
        data.version = "1.0.0";
        data.server_id = 1;
        data.device_id = "XEG-4L";
        data.device_type = "MI4";
        data.channel = "ddd";
        data.locale = "zh-CN";
        data.net_mode = "3G";
        data.device_platform = "IOS";

        let send_msg = {login:data};
        appNet.Send(send_msg);
    },

    ServerBtn: function() {
        appEvent.DispatchEvent("show_server_list");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
