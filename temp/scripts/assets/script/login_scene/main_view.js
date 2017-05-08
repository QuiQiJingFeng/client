"use strict";
cc._RFpush(module, '947c5tunv1LVrvNExtGUsCt', 'main_view');
// script/login_scene/main_view.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        login_anim: sp.Skeleton,
        register_node: cc.Node,
        server_panel: cc.Node,
        bottom_panel: cc.Node,
        server_msgbox: cc.Node,
        mu77_login: cc.Button,
        weichat_btn: cc.Button,
        guest_btn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        self.mu77_login.node.on('click', self.Mu77Login, self);
        self.weichat_btn.node.on('click', self.WeichatLogin, self);
        self.guest_btn.node.on('click', self.GuestLogin, self);
        self.login_anim.addAnimation(1, "loop_1", true, 1);

        if (!cc.sys.isNative) {
            self.guest_btn.node.removeFromParent();
        }

        self.InitProject();
        self.RegisterLogicEvent();
    },

    RegisterLogicEvent: function RegisterLogicEvent() {
        var self = this;

        appEvent.RegisterEvent("login_success", function (data) {
            self.server_panel.active = true;
            self.register_node.active = false;

            appNet.Connect();
        });

        appEvent.RegisterEvent("login_failure", function (result) {
            cc.log("登陆失败", result);
        });

        appEvent.RegisterEvent("back_login", function (result) {
            self.server_panel.active = false;
            self.register_node.active = false;
            self.bottom_panel.active = true;
        });

        appEvent.RegisterEvent("show_server_list", function (result) {
            self.server_msgbox.active = true;
        });
    },

    InitProject: function InitProject() {

        window.appNet = require("network");
        window.appNet.Init();
        window.appEvent = require("event_dispatcher")();
        window.appEvent.Init();
        window.appUtils = require("utils");

        var login_logic = require("login_logic");
        login_logic.Init();
    },

    //MU77登录
    Mu77Login: function Mu77Login(event) {
        var self = this;
        self.register_node.active = true;
    },
    //微信登录
    WeichatLogin: function WeichatLogin(event) {},
    //游客登录
    GuestLogin: function GuestLogin(event) {
        cc.log("Guest....");
    }
});

cc._RFpop();