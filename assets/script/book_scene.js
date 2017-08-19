let Util = require("FYDUtil");
let datacenter = require("datacenter");
cc.Class({
    extends: cc.Component,

    properties: {
        viewcontent: cc.Node,
        contentLabel: cc.Label,
        btnChapterList: cc.Button,
        btnPreChapter: cc.Button,
        btnNextChapter: cc.Button,
        scrollview: cc.ScrollView
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        let cur_index = Util.GetValueForKey("cur_index") 

        if(!cur_index){
            cur_index = 0;
            Util.SetValueForKey("cur_index",0) 
        }
        self.Process(cur_index);
    },

    Process: function(index){
        let self = this;
        if(!datacenter.chapter_list[index]){
            console.log("已经到最后一章了=>",index);
            return;
        }
        let url = datacenter.chapter_list[index].chapter_link;
        console.log("FYD---url = ",url);
        url = encodeURIComponent(url)
        Util.SendGetRequest("http://47.52.99.120:8888/Content?url="+url,function(content){
            let data = JSON.parse(content)
            if(data.success){
                self.contentLabel.string = data.content;
                let size = self.contentLabel.node.getContentSize()
                Util.SetValueForKey("cur_index",index) 
                self.viewcontent.setContentSize(size);
                self.scrollview.scrollToOffset(cc.p(0,0));
            }
        });
    },

    btnChapterListClick: function () {

    },

    btnPreChapterClick: function () {
        let self = this;
        let cur_index = Util.GetValueForKey("cur_index") 
        cur_index = parseInt(cur_index);
        self.Process(cur_index-1);
    },

    btnNextChapterClick: function () {
        let self = this;
        let cur_index = Util.GetValueForKey("cur_index") 
        cur_index = parseInt(cur_index);
        self.Process(cur_index+1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
