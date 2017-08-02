let loading_view = {}

loading_view.Init = function(call_back){
	let self = this;
	// 加载 Prefab
	cc.loader.loadRes("views/loading_view", function (err, prefab) {
	    self.loading_view = cc.instantiate(prefab);
	    console.log(cc.visibleRect);
	    console.log(self.loading_view);
	    self.txt_title = self.loading_view.getChildByName("txt_title").getComponent("cc.Label");
	    self.bg_dice = self.loading_view.getChildByName("bg_dice");
	    self.bg_loding = self.loading_view.getChildByName("bg_loding");
	    call_back();
	});
	
}

loading_view.Show = function(title){
	let self = this;
	if(self.loading_view.parent)
		return;

	let center = cc.visibleRect.center;
	console.log(self.loading_view);
	self.loading_view.setPosition(center.x,center.y);
    cc.director.getScene().addChild(self.loading_view);
    self.txt_title.string = title;

    //action
    let action1 = cc.repeatForever(cc.rotateBy(1, 360));
    let action2 = cc.repeatForever(cc.rotateBy(2, 360));
    self.bg_loding.runAction(action1);
    self.bg_dice.runAction(action2);
}

loading_view.Hide = function(){
	let self = this;	
    cc.director.getScene().removeChild(self.loading_view);
}

module.exports = loading_view;