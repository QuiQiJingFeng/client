/*
    @author  FYD
    @date    2017.07.06
*/
let FYDArray = require("FYDArray");

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        item_script:"",     //指定cell脚本的名称
    },
    //代码加载完毕
    onLoad: function () {
        let self = this;
        self.scrollview = self.node.getComponent("cc.ScrollView")
        //是否为竖直方向
        self._vertical = self.scrollview.vertical;
        //视口
        self.view_port = self.node.getChildByName("view");
        //返回的是包围盒的矩形，跟锚点在哪里无关,这里获得的是相对于scrollview的坐标系的包围盒
        self.box = self.view_port.getBoundingBox();
        //内容节点
        self.content = self.view_port.getChildByName("content");

        let template = cc.instantiate(self.item);
        self.item_size = template.getContentSize();
        self.item_anchor = template.getAnchorPoint();
        
        self.node.on("scrolling",self.Scrolling,self);
        self.node.on("scroll-ended",self.ScrollEnd,self);
    },

    ResetProperty:function() {
        let self = this;
        self.reuse_cells = new FYDArray();
        self.cur_cells = new FYDArray();
        self.positions = new FYDArray();
        self.moving = false;
    },

    Scrolling: function () {
        let self = this;
        self.moving = true;
    },

    ScrollEnd: function () {
        let self = this;
        self.moving = false;
    },

    DequeueCell: function(idx) {
        let self = this;
        let item;
        if(self.reuse_cells.length() > 0) {
            item = self.reuse_cells.removefirst();
        }else{
            item = cc.instantiate(self.item);
        } 
        item.tag = idx;
        let msg = self.data[idx];
        if(!msg) {cc.log("data 不存在-----",idx)}
        item.getComponent(self.item_script).RefreshData(self.data[idx]);
        self.cur_cells.push(item);
        return item;
    },

    //初始根据数据初始化
    LoadData: function (data) {
        let self = this;
        self.ResetProperty();
        self.data = data;
        self.content.removeAllChildren();
        self.scrollview.scrollToOffset(cc.p(0,0));
        self.offset_y = (1 - self.item_anchor.y) * self.item_size.height
        self.offset_x = self.item_anchor.x * self.item_size.width
        let unit_x = self.item_size.width
        let unit_y = 0
        if (self._vertical) {
            unit_x = 0
            unit_y = self.item_size.height
        }
        let last_x,last_y
        for (let i = 0; i < data.length; ++i) {
            let x = self.offset_x + unit_x * i
            let y = -1 * (self.offset_y + unit_y * i)
            let pos = cc.p(x,y);
            //世界坐标点
            let word_pos = self.content.convertToWorldSpaceAR(pos);
            let new_pos = self.node.convertToNodeSpaceAR(word_pos);
            let is_contain = cc.rectContainsPoint(self.box,new_pos);
            if(is_contain) {
                let item = self.DequeueCell(i);
                item.setPosition(pos);
                self.content.addChild(item);
            }
            last_x = x;
            last_y = y;
            self.positions.push(pos);
        }
        let width = last_x + self.item_size.width * self.item_anchor.x
        let height = -last_y + self.item_size.height * (1 - self.item_anchor.y)
        self.content.setContentSize(cc.size(width,height));
    },

    update: function (dt) {
        let self = this;
        if(self.moving) {
            let children = self.cur_cells.cells;
            for(let idx in children) {
                let child = children[idx];
                //将child的bodingbox转换到scrollview上
                let box = child.getBoundingBox();
                let pos = cc.p(box.x,box.y);
                let word_pos = self.content.convertToWorldSpaceAR(pos);
                let new_pos = self.node.convertToNodeSpaceAR(word_pos);
                box.x = new_pos.x;
                box.y = new_pos.y;

                let is_inter = cc.rectIntersectsRect(box,self.box);
                if(!is_inter) {
                    child.removeFromParent();
                    self.cur_cells.remove(child);
                    self.reuse_cells.push(child);
                }
            }
            let positions = self.positions.cells;
            for(let idx in positions) {
                let pos = positions[idx];
                let cpos = cc.p(pos.x-self.offset_x,pos.y-self.offset_y);
                let word_pos = self.content.convertToWorldSpaceAR(cpos);
                let new_pos = self.node.convertToNodeSpaceAR(word_pos);
                let rect = cc.rect(new_pos.x,new_pos.y,self.item_size.width,self.item_size.height);
                let is_contain = cc.rectIntersectsRect(self.box,rect);
                let has = false;
                if(is_contain) {
                    let children = self.cur_cells.cells;
                    for(let id in children) {
                        let item = children[id];
                        if(item.tag === idx){
                            has = true;
                            break;
                        }
                    }
                    if(!has){
                        let item = self.DequeueCell(idx);
                        item.setPosition(pos);
                        self.content.addChild(item);
                    }
                }
            }

            
        }
    },
});
