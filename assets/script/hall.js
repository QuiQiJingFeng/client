 let user_logic = require("user");

 cc.Class({
    extends: cc.Component,

    properties: {
        cardNumText:   cc.Label,
        userNameText:  cc.Label,
        roleIcon:      cc.Sprite,
        userIdText:    cc.Label
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        self.cardNumText.string = user_logic.card_num;
        self.userNameText.string = user_logic.user_name;
        self.userIdText.string = user_logic.user_id;
        let res = "textures/images/GameEnd/GameEnd10";
        if(user_logic.role_id == 0){
            res = "textures/images/GameEnd/GameEnd9";
        }
        cc.loader.loadRes(res, cc.SpriteFrame, function (err, frame) {
            self.roleIcon.spriteFrame = frame;
        });
    },
});
