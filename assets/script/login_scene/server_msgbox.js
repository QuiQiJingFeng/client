let login_logic = require("login_logic");
cc.Class({
    extends: cc.Component,

    properties: {
        close_btn:    cc.Button,
        shadow:       cc.Node,
        tableview: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.close_btn.node.on('click',self.CloseBtn,self);


        appEvent.RegisterEvent("Close",function(type){
            if(type == "server_msgbox"){
                self.CloseBtn();
            }
        });
    },

    onEnable: function() {
        let self = this;
        self.shadow.active = true;
        if(!self.first) {
            login_logic.GetServerList(function(value){
                let data = value.game_server;
                let tableview = self.tableview.getComponent('tableview');
                tableview.LoadData(data);

            });
            self.first = true;
        }
        
    },

    CloseBtn: function() {
        let self = this;
        self.shadow.active = false;
        self.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
