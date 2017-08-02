 cc.Class({
    extends: cc.Component,

    properties: {
        _login_path: "http://queqijingfeng.site:3000/login",
        _register_path:"http://queqijingfeng.site:3000/register",
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        
        if(!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS){
            cc.find("Canvas/login_view/btn_guest").active = true;
            cc.find("Canvas/login_view/btn_weixin").active = false;
        }
        else{
            cc.find("Canvas/login_view/btn_guest").active = false;
            cc.find("Canvas/login_view/btn_weixin").active = true;
        }

        app.Net.RegisterEvent("login_ret",function(recv_msg){
            let result = recv_msg.result;
            if(result == "success"){
                cc.director.loadScene("hall");
            }else if(result == "create_role"){
                cc.director.loadScene("createrole");
            }else if(result == "auth_failer"){
                //显示登陆失败提示
                console.log("result = "+result);
            }else{
                console.log("result = "+result);
            }
        });
    },
    
    onBtnWeiChatClicked:function(){
        var account =  cc.sys.localStorage.getItem("wx_account");
        var sign = cc.sys.localStorage.getItem("wx_sign");
        if(account != null && sign != null){
            var ret = {
                errcode:0,
                account:account,
                sign:sign
            }
            cc.vv.userMgr.onAuth(ret);
        }   
    },
    //游客登录
    onBtnGuestClicked:function(){
        console.log("游客登录------");
        let self = this;
        if(true) return;
        let account = app.Utils.GetValueForKey("guest_account");
        account = false;
        if (!account){
            account = app.Utils.GeneralAccount();   
        }
        let password = "123456";
        //游客登录
        let post_data = {"action":"register","account":account,"password":password};
        console.log(self._register_path);
        app.Utils.SendPostRequest(self._register_path,post_data,function(content){
            let value = JSON.parse(content);
            if(value.result == "success") {
                app.Utils.SetValueForKey("guest_account",account);
                console.log("FYD========>>>登陆成功");
                self.onLogin(account,password);
            }else {
                console.log("FYD========>>>登陆失败");
            }
        });
    },

    onBtnWeichatClicked:function(){
        var self = this;
        cc.vv.anysdkMgr.login();
    },

    //登陆逻辑
    onLogin:function(account,password){
        let self = this;
        let data = {}
        data.account = account;
        data.password = password;

        data.version = "1.0.0";
        data.server_id = 1;
        data.locale = "zh-CN";
        data.platform = app.Utils.GetPlatform();
        data.logintype = "mu77";
        data.device_type = "MI4";
        data.net_mode = "3G";


        app.Net.Send({login:data});
    }
});
