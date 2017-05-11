"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab
    },
    //代码加载完毕
    onLoad: function onLoad() {
        var self = this;
        self.scrollview = self.node.getComponent("cc.ScrollView");
        //是否为竖直方向
        self._vertical = self.scrollview.vertical;
        //视口
        self.view_port = self.node.getChildByName("view");
        self.box = self.view_port.getBoundingBox();
        //内容节点
        self.content = self.view_port.getChildByName("content");

        var template = cc.instantiate(self.item);
        self.item_size = template.getContentSize();
        self.item_anchor = template.getAnchorPoint();

        self.reuse_cells = [];

        self.node.on("scrolling", self.Scrolling, self);

        self.node.on("scroll-ended", function () {
            cc.log("---------------scroll-ended-------------");
        });
    },

    DequeueCell: function DequeueCell() {
        var self = this;
        if (self.reuse_cells.length > 0) {
            return self.reuse_cells.pop();
        }

        return cc.instantiate(self.item);
    },

    //初始根据数据初始化
    LoadData: function LoadData(data) {
        var self = this;
        self.content.removeAllChildren();
        self.scrollview.scrollToOffset(cc.p(0, 0));
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
            var is_contain = cc.rectContainsPoint(self.box, pos);
            if (is_contain) {
                var item = self.DequeueCell();
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

    Scrolling: function Scrolling() {
        cc.log("--------scrolling------------");
    }

});