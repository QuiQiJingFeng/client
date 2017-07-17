let pbjs = require("protobufjs")
let FYDProto = {};

FYDProto.Init = function() {
	let self = this;
    let root = require("protocol");
	self.C2GS = root.C2GS
	self.GS2C = root.GS2C
 
}

FYDProto.encode = function(data) {
    let self = this;
    let msg = new self.C2GS(data)   
    
    return msg.encode().toBuffer();
}

FYDProto.decode = function(buffer) {
    let self = this;
	return self.GS2C.decode(buffer).encodeJSON();
}
module.exports = FYDProto;