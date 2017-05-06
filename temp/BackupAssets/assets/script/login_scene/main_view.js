let event_dispatcher = require("event_dispatcher");
let network = require("network");
cc.Class({
    extends: cc.Component,

    properties: {
        gamecenter_btn: cc.Button,
        facebook_btn:   cc.Button,
        google_btn:     cc.Button,
        guest_btn:     cc.Button
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        //初始化工具类
        event_dispatcher.Init();
        network.Init();

        self.gamecenter_btn.node.on('click',self.GameCenterLogin,self);
        self.facebook_btn.node.on('click',self.FaceBookLogin,self);
        self.google_btn.node.on('click',self.GoogleLogin,self);
        self.guest_btn.node.on('click',self.GuestLogin,self);

        self.RegisterNetEvent();    
    },

    RegisterNetEvent:function() {
        let self = this;
        event_dispatcher.RegisterEvent("login_ret",function(data) {
            //,,,,,
            
        });

    },
    //GameCenter登录
    GameCenterLogin:function(event) {
        cc.log("GAME CENTER....");
    },
    //FaceBook登录
    FaceBookLogin:function(event) {
        cc.log("FACE BOOK....");
    },
    //Google登录
    GoogleLogin:function(event) {
        cc.log("Google....");
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
