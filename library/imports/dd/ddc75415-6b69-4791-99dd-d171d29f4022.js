'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

        if (!cc.sys.isNative) {
            self.guest_btn.node.removeFromParent();
        }
    },
    //MU77登录
    Mu77Login: function Mu77Login(event) {
        var self = this;
        appEvent.DispatchEvent("LOGIN_VIEW_MODE", "REGISTER_PANEL");
    },
    //微信登录
    WeichatLogin: function WeichatLogin(event) {},
    //游客登录
    GuestLogin: function GuestLogin(event) {}
});