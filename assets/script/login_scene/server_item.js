let login_logic = require("login_logic");
cc.Class({
    extends: cc.Component,

    properties: {
        name_txt: cc.Label
    },
    onLoad: function () {
        let self = this;
        self.node.on("click",self.ClickEvent,self);
    },
    //注册点击方法
    ClickEvent: function() {
        let self = this;
        appEvent.DispatchEvent("SELECT_SERVER",self.data);
        appEvent.DispatchEvent("Close","server_msgbox");

    },
    //刷新数据
    RefreshData: function (data) {
        let self = this;
        self.data = data;
        self.name_txt.string = data.name;
    }
});
