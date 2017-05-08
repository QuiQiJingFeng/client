"use strict";
cc._RFpush(module, '10d2aaLfV1DTYc9rJ5dwNHm', 'register_panel');
// script/login_scene/register_panel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        login_btn: cc.Button,
        register_btn: cc.Button,
        close_btn: cc.Button,
        account_input: cc.EditBox,
        password_input: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.login_btn.node.on('click', self.LoginBtn, self);
        self.register_btn.node.on('click', self.RegisterBtn, self);
        self.close_btn.node.on('click', self.CloseBtn, self);
    },

    LoginBtn: function LoginBtn() {
        var self = this;
        var account = self.account_input.string;
        var password = self.password_input.string;
        var data = { account: account, password: password };
        appEvent.DispatchEvent("LOGIN_LOGIC", "MU77LOGIN", data);
    },

    RegisterBtn: function RegisterBtn() {
        var self = this;
        var account = self.account_input.string;
        var password = self.password_input.string;
        var data = { account: account, password: password };
        appEvent.DispatchEvent("LOGIN_LOGIC", "MU77REGISTER", data);
    },

    CloseBtn: function CloseBtn() {
        var self = this;
        self.node.active = false;
    }
});

cc._RFpop();