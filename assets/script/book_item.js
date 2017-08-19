let Util = require("FYDUtil");
let datacenter = require("datacenter");
cc.Class({
    extends: cc.Component,

    properties: {
        img: cc.Sprite,
        bookname: cc.Label,
        desc: cc.Label,
        autor: cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },
    
    RefreshData:function(data) {
        let self = this;
        self.bookname.string = data.name;
        self.desc.string = data.desc;
        self.autor.string = data.author;
        self.link = data.link;
    },
    
    onClicked: function(){
        let self = this;
        let url = encodeURIComponent(self.link)
        Util.SendGetRequest("http://47.52.99.120:8888/ChapterList?url="+url,function(content){
            let data = JSON.parse(content);
            console.log(data);
            if(data.success){
                datacenter.chapter_list = data.result;
                cc.director.loadScene("book_scene");
            }
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
