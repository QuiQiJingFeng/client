cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab
    },
    //代码加载完毕
    onLoad: function () {
        let self = this;
        //是否为竖直方向
        self._vertical = self.node.getComponent("cc.ScrollView").vertical;
        //视口
        self.view_port = self.node.getChildByName("view");
        self.box = self.view_port.getBoundingBox();
        //内容节点
        self.content = self.view_port.getChildByName("content");


        let template = cc.instantiate(self.item);
        self.item_size = template.getContentSize();
        self.item_anchor = template.getAnchorPoint();

        
        self.reuse_cells = {};
    },

    DequeueCell: function() {
        if(self.reuse_cells.length > 0) {
            return self.reuse_cells.pop();
        }

        return cc.instantiate(self.item);
    },

    //初始根据数据初始化
    LoadData: function (data) {
        let self = this;

        self.content.removeAllChildren();
        let offset_y = (1 - self.item_anchor.y) * self.item_size.height
        let offset_x = self.item_anchor.x * self.item_size.width
        let unit_x = self.item_size.width
        let unit_y = 0
        if (self._vertical) {
            unit_x = 0
            unit_y = self.item_size.height
        }
        let last_x,last_y
        for (let i = 0; i < data.length; ++i) {
            let x = offset_x + unit_x * i
            let y = -1 * (offset_y + unit_y * i)
            let pos = cc.p(x,y);
            //世界坐标点
            let word_pos = self.content.convertToWorldSpace(pos);
            let new_pos = self.view_port.convertToNodeSpace(pos);
            let is_contain = cc.rectContainsPoint(self.box,pos);
            if(is_contain) {
                let item = self.DequeueCell();
                item.setPosition(cc.p(x,y));
                self.content.addChild(item);
            }
            last_x = x;
            last_y = y;
        }
        let width = last_x + self.item_size.width * self.item_anchor.x
        let height = -last_y + self.item_size.height * (1 - self.item_anchor.y)
        self.content.setContentSize(cc.size(width,height));
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let children = self.content.getAllChildren();
        for(var child in children) {
            let pos = child.getPosition();
        }
    },
});
