cc.Class({
    extends: cc.Component,

    properties: {
        left_btn:     cc.Button,
        right_btn:    cc.Button,
        confirm_btn:  cc.Button,
        random_name_btn:     cc.Button,
        name_desc:    cc.Label,
        role:         cc.Sprite
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.left_btn.node.on('click',self.LeftBtnClick,self);
        self.right_btn.node.on('click',self.RightBtnClick,self);
        self.confirm_btn.node.on('click',self.ConfirmBtnClick,self);
        self.random_name_btn.node.on('click',self.RandomNameBtnClick,self);   

        self.select_index = 0;
    },

    LeftBtnClick: function () {
        let self = this;
        let new_index = self.select_index - 1;

        let max_index = appConfig.mercenary.length - 1;

        if(new_index < max_index){
            self.right_btn.node.opacity = 255;
            self.right_btn.activ = true;
        }

        if(new_index == 0){
            self.left_btn.node.opacity = 77;
            self.left_btn.active = false;
        }else if(new_index < 0){
            return;
        }

        self.select_index = new_index;
       var imgUrl = "resources/mercenary/"+appConfig.mercenary[new_index].sprite+".png";
        self.role.spriteFrame = new cc.SpriteFrame(cc.url.raw(imgUrl));
    },

    RightBtnClick: function () {
        let self = this;
        let new_index = self.select_index + 1;
        let max_index = appConfig.mercenary.length - 1;
        
        if(new_index > 0){
            self.left_btn.node.opacity = 255;
            self.left_btn.active = true;
        }

        if(new_index == max_index){
            self.right_btn.node.opacity = 77;
            self.right_btn.active = false;
        }else if(new_index > max_index){
            return;
        }

        self.select_index = new_index;  
       var imgUrl = "resources/mercenary/"+appConfig.mercenary[new_index].sprite+".png";
        self.role.spriteFrame = new cc.SpriteFrame(cc.url.raw(imgUrl));

    },

    ConfirmBtnClick: function() {
        let self = this;
    },

    RandomNameBtnClick: function() {
        let self = this;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
