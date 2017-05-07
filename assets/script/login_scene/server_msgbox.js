cc.Class({
    extends: cc.Component,

    properties: {
        close_btn:    cc.Button,
        shadow:       cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.close_btn.node.on('click',self.CloseBtn,self);
        
    },
    onEnable: function() {
        let self = this;
        self.shadow.active = true;
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
