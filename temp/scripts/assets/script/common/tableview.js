"use strict";
cc._RFpush(module, '1769c7KAb5AbpTOvvaOUT/X', 'tableview');
// script/common/tableview.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab
    },
    //代码加载完毕
    onLoad: function onLoad() {
        var self = this;
        //是否为竖直方向
        self._vertical = self.node.getComponent("cc.ScrollView").vertical;
        //视口
        self.view_port = self.node.getChildByName("view");
        self.box = self.view_port.getBoundingBox();
        //内容节点
        self.content = self.view_port.getChildByName("content");

        var template = cc.instantiate(self.item);
        self.item_size = template.getContentSize();
        self.item_anchor = template.getAnchorPoint();

        self.reuse_pool = {};
        self.used_cells = {};
    },

    LoadData: function LoadData(data) {
        var self = this;

        self.content.removeAllChildren();
        var offset_y = (1 - self.item_anchor.y) * self.item_size.height;
        var offset_x = self.item_anchor.x * self.item_size.width;
        var unit_x = self.item_size.width;
        var unit_y = 0;
        if (self._vertical) {
            unit_x = 0;
            unit_y = self.item_size.height;
        }
        var last_x = void 0,
            last_y = void 0;
        for (var i = 0; i < data.length; ++i) {
            var x = offset_x + unit_x * i;
            var y = -1 * (offset_y + unit_y * i);
            var pos = cc.p(x, y);
            //世界坐标点
            var word_pos = self.content.convertToWorldSpace(pos);
            var new_pos = self.view_port.convertToNodeSpace(pos);
            cc.log("new_pos=>", new_pos);
            cc.log("self.box=>", self.box);
            var is_contain = cc.rectContainsPoint(self.box, pos);
            if (is_contain) {
                var item = cc.instantiate(self.item);
                item.setPosition(cc.p(x, y));
                self.content.addChild(item);
            }
            last_x = x;
            last_y = y;
        }
        var width = last_x + self.item_size.width * self.item_anchor.x;
        var height = -last_y + self.item_size.height * (1 - self.item_anchor.y);
        self.content.setContentSize(cc.size(width, height));
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
});

cc._RFpop();