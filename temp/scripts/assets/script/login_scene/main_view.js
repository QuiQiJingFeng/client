"use strict";
cc._RFpush(module, '947c5tunv1LVrvNExtGUsCt', 'main_view');
// script/login_scene/main_view.js

"use strict";

var event_dispatcher = require("event_dispatcher");
var network = require("network");
cc.Class({
    extends: cc.Component,

    properties: {
        gamecenter_btn: cc.Button,
        facebook_btn: cc.Button,
        google_btn: cc.Button,
        guest_btn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        //初始化工具类
        event_dispatcher.Init();
        network.Init();

        self.gamecenter_btn.node.on('click', self.GameCenterLogin, self);
        self.facebook_btn.node.on('click', self.FaceBookLogin, self);
        self.google_btn.node.on('click', self.GoogleLogin, self);
        self.guest_btn.node.on('click', self.GuestLogin, self);
    },
    //GameCenter登录
    GameCenterLogin: function GameCenterLogin(event) {
        cc.log("GAME CENTER....");
    },
    //FaceBook登录
    FaceBookLogin: function FaceBookLogin(event) {
        cc.log("FACE BOOK....");
    },
    //Google登录
    GoogleLogin: function GoogleLogin(event) {
        cc.log("Google....");
    },
    //游客登录
    GuestLogin: function GuestLogin(event) {
        cc.log("Guest....");
        var num = cc.random0To1() * 100;
        var data = {};
        data.account = "zhanghu" + num;
        data.password = "mima";
        data.platform = "应用宝";
        data.version = "1.0.0";
        data.server_id = 1;
        data.device_id = "XEG-4L";
        data.device_type = "MI4";
        data.channel = "应用宝";
        data.locale = "zh-CN";
        data.net_mode = "3G";
        data.device_platform = "IOS";

        var send_msg = { login: data };
        network.Send(send_msg);
    }
});

cc._RFpop();