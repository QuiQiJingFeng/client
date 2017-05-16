"use strict";
cc._RFpush(module, '1160em6Eh5C+pGmkFyOlUP/', 'server_item');
// script/login_scene/server_item.js

"use strict";

var login_logic = require("login_logic");
cc.Class({
    extends: cc.Component,

    properties: {
        name_txt: cc.Label
    },
    onLoad: function onLoad() {
        var self = this;
        self.node.on("click", self.ClickEvent, self);
    },
    //注册点击方法
    ClickEvent: function ClickEvent() {
        var self = this;
        appEvent.DispatchEvent("SELECT_SERVER", self.data);
        appEvent.DispatchEvent("Close", "server_msgbox");
    },
    //刷新数据
    RefreshData: function RefreshData(data) {
        var self = this;
        self.data = data;
        self.name_txt.string = data.name;
    }
});

cc._RFpop();