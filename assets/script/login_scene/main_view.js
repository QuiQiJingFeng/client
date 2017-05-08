cc.Class({
    extends: cc.Component,

    properties: {
        login_anim:    sp.Skeleton,
        register_node: cc.Node,
        server_panel:  cc.Node,
        bottom_panel:  cc.Node,
        server_msgbox: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        self.login_anim.addAnimation(1,"loop_1",true,1);

        self.InitProject();
        self.RegisterLogicEvent();
    },

    RegisterLogicEvent:function() {
        let self = this;
        //主界面只负责UI的显示管理
        appEvent.RegisterEvent("LOGIN_VIEW_MODE",function(type){
            self.SetViewMode(type);
        });
    },

    SetViewMode:function(type){
        let self = this;
        switch(type){
            case "SERVER_LIST":{
                appUtils.Show(self.server_panel);
                appUtils.Hide(self.register_node);
            }break;
            case "BACK_LOGIN":{
                appUtils.Hide(self.server_panel,self.register_node);
                appUtils.Show(self.bottom_panel);                   
            }break;
            case "SERVER_MSGBOX":{
                appUtils.Show(self.server_msgbox);
            }break;
            case "REGISTER_PANEL":{
                appUtils.Show(self.register_node);
            }break;
        }
    },

    InitProject:function() {

        window.appNet = require("network");
        window.appNet.Init();
        window.appEvent = require("event_dispatcher")();
        window.appEvent.Init();
        window.appUtils = require("utils");

        let login_logic = require("login_logic");
        login_logic.Init();
    }
});
