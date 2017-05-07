'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        close_btn: cc.Button,
        shadow: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.close_btn.node.on('click', self.CloseBtn, self);
    },
    onEnable: function onEnable() {
        var self = this;
        self.shadow.active = true;
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