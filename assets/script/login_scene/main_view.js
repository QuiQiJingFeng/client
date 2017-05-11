cc.Class({
    extends: cc.Component,

    properties: {
        login_anim:    sp.Skeleton,
        register_node: cc.Node,
        server_panel:  cc.Node,
        bottom_panel:  cc.Node,
        server_msgbox: cc.Node,
        table_view: cc.Node,
        test_btn: cc.Button
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        self.login_anim.addAnimation(1,"loop_1",true,1);

        self.InitProject();
        self.RegisterLogicEvent();

        self.test_btn.node.on('click',function(){
                let server_list = self.table_view.getComponent("tableview");
                let data = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
                server_list.LoadData(data,true);
        });
    },

    RegisterLogicEvent:function() {
        let self = this;
        //主界面只负责UI的显示管理
        appEvent.RegisterEvent("LOGIN_VIEW_MODE",function(type,data){
            self.SetViewMode(type,data);
        });
    },

    SetViewMode:function(type,data){
        let self = this;
        switch(type){
            case "SERVER_LIST":{
                appUtils.Show(self.server_panel);
                appUtils.Hide(self.register_node);

            }break;
            case "BACK_LOGIN":{
                appNet.DisConnect();
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
