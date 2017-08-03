let user = {};

user.Init = function(){
	let self = this;
    self.query_index = 0;
    self.proto_names = ["query_base_info"];
    app.Net.RegisterEvent("query_base_info_ret",function(recv_msg){
    	self.query_index = self.query_index + 1;
    	console.log("query_base_info_ret");
        let result = recv_msg.result;
        if(result == "success"){
        	self.user_id = recv_msg.user_id
        	self.user_name = recv_msg.user_name;
        	self.role_id = recv_msg.role_id;
        	self.card_num = recv_msg.card_num;

            self.QueryUserInfo();
        }else{
            //显示登陆失败提示
        }
    });
};

user.QueryUserInfo = function() {
	let self = this;
    if(self.query_index >= self.proto_names.length){
    	cc.director.loadScene("hall");
        return;
    }
    // let send_msg = {query_base_info:{}}
    // send_msg[self.proto_names[self.query_index]] = {};
    // console.log(send_msg);
    app.Net.Send({query_base_info:{}});
}


module.exports = user;