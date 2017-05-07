cc.Class({
    extends: cc.Component,

    properties: {
        back_btn:    cc.Button,
        login_btn:   cc.Button,
        server_btn:  cc.Button
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        self.back_btn.node.on('click',self.BackBtn,self);
        self.login_btn.node.on('click',self.LoginBtn,self);
        self.server_btn.node.on('click',self.ServerBtn,self);
    },

    BackBtn: function() {
        appEvent.DispatchEvent("back_login");
    },

    LoginBtn: function() {

    },

    ServerBtn: function() {
        appEvent.DispatchEvent("show_server_list");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
