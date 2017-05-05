let pbjs = require("protobufjs")
require('buffer')
let HEADER_SIZE = 2

let protobuf = {};

protobuf.Init = function() {
	let self = this;
    self.C2GS = null;
    self.GS2C = null;

    let root = require("protocol");
	self.C2GS = root.C2GS
	self.GS2C = root.GS2C
 
}

protobuf.encode = function(data) {
    let self = this;
    let msg = new self.C2GS(data)   

    let buffer = msg.encode().toBuffer();
    //添加包头
	let size = buffer.byteLength;
	let headBuf = Buffer.alloc(HEADER_SIZE); 
	headBuf.writeUInt16BE(size, 0);
	let newBuffer = Buffer.concat([Buffer.from(headBuf),Buffer.from(buffer)],headBuf.byteLength + buffer.byteLength);
    return newBuffer;
}

protobuf.decode = function(buffer) {
    let self = this;
	let total_size = buffer.byteLength;

    if(total_size < HEADER_SIZE){
        return null;
    }
    //取出前2个字节,计算出内容的长度
    let header = new Uint8Array(buffer.slice(0,HEADER_SIZE));
    let content_size = header[0] * 256 + header[1];
    //如果数据没有接收完整
    if (total_size < content_size + HEADER_SIZE) {
        return null;
    }
    let data = buffer.slice(HEADER_SIZE,HEADER_SIZE+1+content_size);
	return self.GS2C.decode(data);;
}
module.exports = protobuf;