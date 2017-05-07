let event_dispatcher = require("event_dispatcher");
let network = require("network");
cc.Class({
    extends: cc.Component,

    properties: {
        mu77_login:    cc.Button,
        weichat_btn:   cc.Button,
        guest_btn:     cc.Button,
        login_anim:    sp.Skeleton,
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        //初始化工具类
        event_dispatcher.Init();
        network.Init();

        self.mu77_login.node.on('click',self.Mu77Login,self);
        self.weichat_btn.node.on('click',self.WeichatLogin,self);;
        self.guest_btn.node.on('click',self.GuestLogin,self);
        
        self.login_anim.setEventListener(function(param1,param2){
            cc.log("param1=>",param1);
            cc.log("param2=>",param2);
        });
        
        self.RegisterNetEvent();    
    },

    RegisterNetEvent:function() {
        let self = this;
        event_dispatcher.RegisterEvent("login_ret",function(data) {
            //,,,,,
            
        });

    },
    //MU77登录
    Mu77Login:function(event) {
        cc.log("GAME CENTER....");
    },
    //微信登录
    WeichatLogin:function(event) {
        cc.log("FACE BOOK....");
    },
    //游客登录
    GuestLogin:function(event) {
        cc.log("Guest....");
        let num = cc.random0To1() * 100
        let data = {} 
        data.account="zhanghu"+num;
        data.password="mima";
        data.platform="应用宝";
        data.version="1.0.0";
        data.server_id=1;
        data.device_id="XEG-4L";
        data.device_type="MI4";
        data.channel="应用宝";
        data.locale="zh-CN";
        data.net_mode="3G";
        data.device_platform="IOS";

        let send_msg = {login:data};
        network.Send(send_msg);
    },
});
