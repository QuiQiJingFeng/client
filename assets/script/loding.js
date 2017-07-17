require("common")
// Compatible with v1.5.0+
cc.Class({
    extends: cc.Component,

    properties: {
        txt_tip:cc.Label,
        _str_state:'',
        _progress:0.0,
        _is_loding:false
    },

    // use self for initialization
    onLoad: function () {
        let self = this;
        //如果是web模式(适应宽高),如果是 手机模式则只适应宽度
        if(!cc.sys.isNative){
            var cvs = self.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        self.txt_tip.string = self._str_state;
        //预加载资源
        self.startPreloading();
    },
    
    startPreloading:function(){
        let self = this;
        self._str_state = app.Const["loding"]["wait_for_loding"];
        self._is_loding = true;
        //绑定进度回调方法
        cc.loader.onProgress = function ( completedCount, totalCount,  item ){
            if(self._is_loding){
                self._progress = completedCount/totalCount;
            }
        };
        //加载资源文件夹
        cc.loader.loadResDir("textures", function (err, assets) {
            //加载完毕回调
            self.onLoadComplete();
        });      
    },
    
    onLoadComplete:function(){
        let self = this;
        self._is_loding = false;
        self._str_state = app.Const["loding"]["login_ready"];
        cc.loader.onComplete = null;
        //切换到登陆场景
        cc.director.loadScene("login");
    },

    // called every frame, uncomment self function to activate update callback
    update: function (dt) {
        let self = this;
        if(self._str_state.length == 0){
            return;
        }
        self.txt_tip.string = self._str_state + ' ';
        if(self._is_loding){
            self.txt_tip.string += Math.floor(self._progress * 100) + "%";   
        }
        else{
            var t = Math.floor(Date.now() / 1000) % 4;
            for(var i = 0; i < t; ++ i){
                self.txt_tip.string += '.';
            }            
        }
    }
});