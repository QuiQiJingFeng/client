cc.Class({
    extends: cc.Component,

    properties: {
        template: cc.Prefab,
        content_view:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
    },

    onShow: function(data) {
        let self = this;
        let server_list = data["game_server"];
        for (var i = 0; i < server_list.length; ++i) {
            var item = cc.instantiate(self.template);
            item.setScaleX(0.8);
            // item.setPositionX(0);
            let name_node = item.getChildByName("name");
            let lb = name_node.getComponent("cc.Label");
            lb.string = server_list[i].name;
            cc.log(lb);
            self.content_view.addChild(item);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
