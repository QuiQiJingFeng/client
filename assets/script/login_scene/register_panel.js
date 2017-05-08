cc.Class({
    extends: cc.Component,

    properties: {
        login_btn:    cc.Button,
        register_btn:   cc.Button,
        close_btn:      cc.Button,
        account_input:  cc.EditBox,
        password_input:  cc.EditBox
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.login_btn.node.on('click',self.LoginBtn,self);
        self.register_btn.node.on('click',self.RegisterBtn,self);
        self.close_btn.node.on('click',self.CloseBtn,self);
    },

    LoginBtn: function() {
        let self = this;
        let account = self.account_input.string;
        let password = self.password_input.string;
        let data = {account:account,password:password};
        appEvent.DispatchEvent("LOGIN_LOGIC","MU77LOGIN",data); 
    },

    RegisterBtn: function() {
        let self = this;
        let account = self.account_input.string;
        let password = self.password_input.string;
        let data = {account:account,password:password};
        appEvent.DispatchEvent("LOGIN_LOGIC","MU77REGISTER",data);
    },

    CloseBtn: function() {
        let self = this;
        self.node.active = false;
    }
});
