"use strict";
cc._RFpush(module, 'f6660LfFWZGeardQ9ANgDZq', 'server_panel');
// script/login_scene/server_panel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        back_btn: cc.Button,
        login_btn: cc.Button,
        server_btn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.back_btn.node.on('click', self.BackBtn, self);
        self.login_btn.node.on('click', self.LoginBtn, self);
        self.server_btn.node.on('click', self.ServerBtn, self);
    },

    BackBtn: function BackBtn() {
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "BACK_LOGIN");
    },

    LoginBtn: function LoginBtn() {
        appEvent.DispatchEvent("LOGIN_LOGIC", "LOGINSERVER");
    },

    ServerBtn: function ServerBtn() {
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "SERVER_MSGBOX");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();