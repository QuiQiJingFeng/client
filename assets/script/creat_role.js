require("common");
// Compatible with v1.5.0+
let random_name = require("random_name");

cc.Class({
    extends: cc.Component,

    properties: {
        inputName:cc.EditBox,
        confirmBtn:cc.Button
    },

    // use self for initialization
    onLoad: function () {
        let self = this;
        self.generalRandomName();
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
        app.Net.Send({"create_name":{"user_name" : self.inputName.string}});

        app.Net.RegisterEvent("create_name_ret",function(recv_msg){
            let result = recv_msg.result;
            console.log("create_name_ret result = "+result);
            if(result == "success"){
                 cc.director.loadScene("hall");
            }else{
                //显示登陆失败提示
            }
        });
    }
});