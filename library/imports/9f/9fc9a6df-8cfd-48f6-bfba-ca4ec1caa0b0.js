"use strict";

/*
    @author  FYD
    @date    2017.07.06
*/
var FYDArray = require("FYDArray");

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        item_script: "" },
    //代码加载完毕
    onLoad: function onLoad() {
        var self = this;
        self.scrollview = self.node.getComponent("cc.ScrollView");
        //是否为竖直方向
        self._vertical = self.scrollview.vertical;
        //视口
        self.view_port = self.node.getChildByName("view");
        //返回的是包围盒的矩形，跟锚点在哪里无关,这里获得的是相对于scrollview的坐标系的包围盒
        self.box = self.view_port.getBoundingBox();
        //内容节点
        self.content = self.view_port.getChildByName("content");

        var template = cc.instantiate(self.item);
        self.item_size = template.getContentSize();
        self.item_anchor = template.getAnchorPoint();

        self.node.on("scrolling", self.Scrolling, self);
        self.node.on("scroll-ended", self.ScrollEnd, self);
    },

    ResetProperty: function ResetProperty() {
        var self = this;
        self.reuse_cells = new FYDArray();
        self.cur_cells = new FYDArray();
        self.positions = new FYDArray();
        self.moving = false;
    },

    Scrolling: function Scrolling() {
        var self = this;
        self.moving = true;
    },

    ScrollEnd: function ScrollEnd() {
        var self = this;
        self.moving = false;
    },

    DequeueCell: function DequeueCell(idx) {
        var self = this;
        var item = void 0;
        if (self.reuse_cells.length() > 0) {
            item = self.reuse_cells.removefirst();
        } else {
            item = cc.instantiate(self.item);
        }
        item.tag = idx;
        var msg = self.data[idx];
        if (!msg) {
            cc.log("data 不存在-----", idx);
        }
        item.getComponent(self.item_script).RefreshData(self.data[idx]);
        self.cur_cells.push(item);
        return item;
    },

    //初始根据数据初始化
    LoadData: function LoadData(data) {
        var self = this;
        self.ResetProperty();
        self.data = data;
        self.content.removeAllChildren();
        self.scrollview.scrollToOffset(cc.p(0, 0));
        self.offset_y = (1 - self.item_anchor.y) * self.item_size.height;
        self.offset_x = self.item_anchor.x * self.item_size.width;
        var unit_x = self.item_size.width;
        var unit_y = 0;
        if (self._vertical) {
            unit_x = 0;
            unit_y = self.item_size.height;
        }
        var last_x = void 0,
            last_y = void 0;

        for (var i = 0; i < data.length; ++i) {
            var x = self.offset_x + unit_x * i;
            var y = -1 * (self.offset_y + unit_y * i);
            var pos = cc.p(x, y);
            //世界坐标点
            var word_pos = self.content.convertToWorldSpaceAR(pos);
            var new_pos = self.node.convertToNodeSpaceAR(word_pos);
            var is_contain = cc.rectContainsPoint(self.box, new_pos);
            if (is_contain) {
                var item = self.DequeueCell(i);
                item.setPosition(pos);
                self.content.addChild(item);
            }
            last_x = x;
            last_y = y;
            self.positions.push(pos);
        }
        var width = last_x + self.item_size.width * self.item_anchor.x;
        var height = -last_y + self.item_size.height * (1 - self.item_anchor.y);
        self.content.setContentSize(cc.size(width, height));
    },

    update: function update(dt) {
        var self = this;
        if (self.moving) {
            var children = self.cur_cells.cells;
            for (var idx in children) {
                var child = children[idx];
                //将child的bodingbox转换到scrollview上
                var box = child.getBoundingBox();
                var pos = cc.p(box.x, box.y);
                var word_pos = self.content.convertToWorldSpaceAR(pos);
                var new_pos = self.node.convertToNodeSpaceAR(word_pos);
                box.x = new_pos.x;
                box.y = new_pos.y;

                var is_inter = cc.rectIntersectsRect(box, self.box);
                if (!is_inter) {
                    child.removeFromParent();
                    self.cur_cells.remove(child);
                    self.reuse_cells.push(child);
                }
            }
            var positions = self.positions.cells;
            for (var _idx in positions) {
                var _pos = positions[_idx];
                var cpos = cc.p(_pos.x - self.offset_x, _pos.y - self.offset_y);
                var _word_pos = self.content.convertToWorldSpaceAR(cpos);
                var _new_pos = self.node.convertToNodeSpaceAR(_word_pos);
                var rect = cc.rect(_new_pos.x, _new_pos.y, self.item_size.width, self.item_size.height);
                var is_contain = cc.rectIntersectsRect(self.box, rect);
                var has = false;
                if (is_contain) {
                    var _children = self.cur_cells.cells;
                    for (var id in _children) {
                        var item = _children[id];
                        if (item.tag === _idx) {
                            has = true;
                            break;
                        }
                    }
                    if (!has) {
                        var _item = self.DequeueCell(_idx);
                        _item.setPosition(_pos);
                        self.content.addChild(_item);
                    }
                }
            }
        }
    }
});