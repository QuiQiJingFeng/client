let pbjs = require("protobufjs")
let protobuf = {};

protobuf.Init = function() {
	let self = this;
    let root = require("protocol");
	self.C2GS = root.C2GS
	self.GS2C = root.GS2C
 
}

protobuf.encode = function(data) {
    let self = this;
    let msg = new self.C2GS(data)   
    
    return msg.encode().toBuffer();
}

protobuf.decode = function(buffer) {
    let self = this;
	return self.GS2C.decode(buffer).encodeJSON();
}
module.exports = protobuf;