let login_logic = require("login_logic");
cc.Class({
    extends: cc.Component,

    properties: {
        close_btn:    cc.Button,
        shadow:       cc.Node,
        scroll_view: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.close_btn.node.on('click',self.CloseBtn,self);
    },

    onEnable: function() {
        let self = this;
        self.shadow.active = true;
        login_logic.GetServerList(function(value){
            let component = self.scroll_view.getComponent('server_list_view');
            cc.log("component==>",component);
            component.onShow(value);

        });
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
