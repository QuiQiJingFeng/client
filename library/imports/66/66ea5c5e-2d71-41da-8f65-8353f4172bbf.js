"use strict";

var login_logic = require("login_logic");
cc.Class({
    extends: cc.Component,

    properties: {
        close_btn: cc.Button,
        shadow: cc.Node,
        tableview: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.close_btn.node.on('click', self.CloseBtn, self);

        appEvent.RegisterEvent("Close", function (type) {
            if (type == "server_msgbox") {
                self.CloseBtn();
            }
        });
    },

    onEnable: function onEnable() {
        var self = this;
        self.shadow.active = true;
        if (!self.first) {
            login_logic.GetServerList(function (value) {
                var data = value.game_server;
                var tableview = self.tableview.getComponent('tableview');
                tableview.LoadData(data);
            });
            self.first = true;
        }
    },

    CloseBtn: function CloseBtn() {
        var self = this;
        self.shadow.active = false;
        self.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});