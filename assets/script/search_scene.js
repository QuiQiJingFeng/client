let Util = require("FYDUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        editbox: cc.EditBox,
        button: cc.Button,
        booklist: cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },
    
    onButtonClick: function() {
        let self = this;
        console.log(self.editbox.string)
        let text = self.editbox.string;
        text = encodeURIComponent(text)
        Util.SendGetRequest("http://47.52.99.120:8888/Search?text="+text,function(content){
            let data = JSON.parse(content)
            if(data.success){
                let table = self.booklist.getComponent("FYDTableView");
                table.LoadData(data.result);
            }
        });
        
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
