"use strict";
cc._RFpush(module, 'fc458UwD4hGgKNNMoc5ksRM', 'login');
// script/login.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _mima: null,
        _mimaIndex: 0,
        _login_path: "http://127.0.0.1:3000/login",
        _register_path: "http://127.0.0.1:3000/register",
        _guest_path: "http://127.0.0.1:3000/guest",
        _server_list_path: "http://127.0.0.1:3000/server_list.js"
    },

    // use this for initialization
    onLoad: function onLoad() {
        if (!cc.sys.isNative) {
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }

        if (!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS) {
            cc.find("Canvas/login_view/btn_guest").active = true;
            cc.find("Canvas/login_view/btn_weixin").active = false;
        } else {
            cc.find("Canvas/login_view/btn_guest").active = false;
            cc.find("Canvas/login_view/btn_weixin").active = true;
        }
    },

    onBtnWeiChatClicked: function onBtnWeiChatClicked() {
        var account = cc.sys.localStorage.getItem("wx_account");
        var sign = cc.sys.localStorage.getItem("wx_sign");
        if (account != null && sign != null) {
            var ret = {
                errcode: 0,
                account: account,
                sign: sign
            };
            cc.vv.userMgr.onAuth(ret);
        }
    },
    //游客登录
    onBtnGuestClicked: function onBtnGuestClicked() {
        console.log("游客登录------");
        var self = this;
        var account = app.Utils.GetValueForKey("guest_account");
        if (!account) {
            account = app.Utils.GeneralAccount();
        }
        var password = "123456";
        //游客登录
        var post_data = { "action": "guest", "account": account, "password": password };

        app.Utils.SendPostRequest(self._guest_path, post_data, function (content) {
            var value = JSON.parse(content);
            if (value.result == "success") {
                app.Utils.SetValueForKey("guest_account", account);
                console.log("FYD========>>>登陆成功");
                self.onLogin(account, password);
            } else {
                console.log("FYD========>>>登陆失败");
            }
        });
    },

    onBtnWeichatClicked: function onBtnWeichatClicked() {
        var self = this;
        cc.vv.anysdkMgr.login();
    },

    onBtnMIMAClicked: function onBtnMIMAClicked(event) {
        if (this._mima[this._mimaIndex] == event.target.name) {
            this._mimaIndex++;
            if (this._mimaIndex == this._mima.length) {
                cc.find("Canvas/btn_guest").active = true;
            }
        } else {
            console.log("oh ho~~~");
            this._mimaIndex = 0;
        }
    },
    //登陆逻辑
    onLogin: function onLogin(account, password) {
        var self = this;
        var data = {};
        data.account = account;
        data.password = password;

        data.version = "1.0.0";
        data.server_id = 1;
        data.locale = "zh-CN";
        data.platform = app.Utils.GetPlatform();
        data.channel = "mu77";
        data.device_type = "MI4";
        data.net_mode = "3G";

        app.Net.Send({ login: data });

        app.Net.RegisterEvent("login_ret", function (recv_msg) {
            var result = recv_msg.result;
            if (result == "success") {
                console.log("FFFFF=====>success");
                cc.director.loadScene("hall");
            } else if (result == "create_role") {
                console.log("FFFFF=====>create_role");
                cc.director.loadScene("createrole");
            } else if (result == "auth_failer") {
                //显示登陆失败提示
            }
        });
    }
});

cc._RFpop();