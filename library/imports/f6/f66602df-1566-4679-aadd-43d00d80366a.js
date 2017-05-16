'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        back_btn: cc.Button,
        login_btn: cc.Button,
        server_btn: cc.Button,
        server_name: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.back_btn.node.on('click', self.BackBtn, self);
        self.login_btn.node.on('click', self.LoginBtn, self);
        self.server_btn.node.on('click', self.ServerBtn, self);

        appEvent.RegisterEvent("SELECT_SERVER", function (data) {
            self.server_name.string = data.name;
        });
    },

    BackBtn: function BackBtn() {
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "BACK_LOGIN");
    },

    LoginBtn: function LoginBtn() {
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "SHOW_LODING");
        appEvent.DispatchEvent("LOGIN_LOGIC", "LOGINSERVER");
    },

    ServerBtn: function ServerBtn() {
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "SERVER_MSGBOX");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});