"use strict";
cc._RFpush(module, '947c5tunv1LVrvNExtGUsCt', 'main_view');
// script/login_scene/main_view.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        login_anim: sp.Skeleton,
        register_node: cc.Node,
        server_panel: cc.Node,
        bottom_panel: cc.Node,
        server_msgbox: cc.Node,
        loading_panel: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        self.login_anim.addAnimation(1, "loop_1", true, 1);

        self.InitProject();
        self.RegisterLogicEvent();
    },

    RegisterLogicEvent: function RegisterLogicEvent() {
        var self = this;
        //主界面只负责UI的显示管理
        appEvent.RegisterEvent("LOGIN_VIEW_MODE", function (type, data) {
            self.SetViewMode(type, data);
        });
    },

    SetViewMode: function SetViewMode(type, data) {
        var self = this;
        switch (type) {
            case "SERVER_LIST":
                {
                    appUtils.Show(self.server_panel);
                    appUtils.Hide(self.register_node);
                }break;
            case "BACK_LOGIN":
                {
                    appNet.DisConnect();
                    appUtils.Hide(self.server_panel, self.register_node);
                    appUtils.Show(self.bottom_panel);
                }break;
            case "SERVER_MSGBOX":
                {
                    appUtils.Show(self.server_msgbox);
                }break;
            case "REGISTER_PANEL":
                {
                    appUtils.Show(self.register_node);
                }break;
            case "SHOW_LODING":
                {
                    appUtils.Show(self.loading_panel);
                }break;
            case "HIDE_LODING":
                {
                    appUtils.Hide(self.loading_panel);
                }break;
        }
    },

    InitProject: function InitProject() {

        window.appNet = require("network");
        window.appNet.Init();
        window.appEvent = require("event_dispatcher")();
        window.appEvent.Init();
        window.appUtils = require("utils");
        window.appConfig = require("config_manager");
        window.appConfig.Init();

        var login_logic = require("login_logic");
        login_logic.Init();
    }
});

cc._RFpop();