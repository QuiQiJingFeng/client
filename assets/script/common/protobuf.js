let pbjs = require("protobufjs")
require('buffer')
let HEADER_SIZE = 2

let protobuf = {};

protobuf.Init = function() {
	let self = this;
    self.C2GS = null;
    self.GS2C = null;
    //如果使用cc.loader.load加载则必须用cc.url.raw进行一次url转换
    //如果使用cc.loader.loadRes则不需要转换,默认从resources里面拿,同时不需要指定后缀，也就意味着res里面不能存在同名的文件,即使是后缀不相同的
    cc.loader.loadRes( "protocol", function( err, res) {
    	if(err){
    		cc.log("加载proto文件失败",err);
    		return ;
    	}
    	let root = pbjs.Root.fromJSON(res);
    	self.C2GS = root.lookup("C2GS");
    	self.GS2C = root.lookup("GS2C");
    });
}

protobuf.encode = function(data) {
    let self = this;
	let msg = self.C2GS.fromObject(data);
    let buffer = self.C2GS.encode(msg).finish();
    console.log("buffer ==>",buffer);

    //添加包头
	let size = buffer.length;
	let headBuf = Buffer.alloc(HEADER_SIZE); 
	headBuf.writeUInt16BE(size, 0);

	let newBuffer = Buffer.concat([Buffer.from(headBuf),Buffer.from(buffer)],headBuf.length + buffer.length);
	return newBuffer;
}

protobuf.decode = function(buffer) {
    let self = this;
	let total_size = buffer.length;

    if(total_size < HEADER_SIZE){
        return null;
    }
    //取出前2个字节,计算出内容的长度
    let header = new Uint16Array(buffer.slice(0,HEADER_SIZE));
    let content_size = header[0] * 256 + header[1];

    //如果数据没有接收完整
    if (total_size < content_size + HEADER_SIZE) {
        return null;
    }

    let data = new Buffer(content_size);
	buffer.slice(HEADER_SIZE,HEADER_SIZE+1+content_size).copy(data);

	return self.C2GS.decode(data);;
}
module.exports = protobuf;