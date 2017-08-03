require("common");
 let user_logic = require("user");
// Compatible with v1.5.0+
let random_name = require("random_name");

cc.Class({
    extends: cc.Component,

    properties: {
        inputName:cc.EditBox,
        confirmBtn:cc.Button,
        bgRole:cc.Sprite,
        select_index:0,
    },

    // use self for initialization
    onLoad: function () {
        let self = this;

        self.generalRandomName();
        app.Net.RegisterEvent("create_name_ret",function(recv_msg){
            let result = recv_msg.result;
            if(result == "success"){
                 user_logic.QueryUserInfo();
            }else{
                //显示登陆失败提示
            }
        });
    },
    generalRandomName : function () {
        let self = this;
        let r1 = Math.floor(Math.random()*random_name["r1"].length) + 1;
        let r2 = Math.floor(Math.random()*random_name["r2"].length) + 1;
        let r3 = Math.floor(Math.random()*random_name["r3"].length) + 1;

        self.inputName.string = random_name["r1"][r1]+random_name["r2"][r2]+random_name["r3"][r3];
    },
    onBtnRandomNameClicked : function (){
        let self = this;
        self.generalRandomName();
    },
    onConfirmBtnClicked : function (){
        let self = this;
        app.Net.Send({create_name:{user_name : self.inputName.string,role_id : self.select_index}});
    },
    onBtnSelectMan : function (){
        let self = this;
        cc.loader.loadRes("textures/images/GameEnd/GameEnd10", cc.SpriteFrame, function (err, frame) {
            self.bgRole.spriteFrame = frame;
            self.select_index = 1;
        });
    },
    onBtnSelectWoman : function (){
        let self = this;
        cc.loader.loadRes("textures/images/GameEnd/GameEnd9", cc.SpriteFrame, function (err, frame) {
            self.bgRole.spriteFrame = frame;
            self.select_index = 0;
        });
    }
});