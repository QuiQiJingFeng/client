"use strict";
cc._RFpush(module, 'c36bcD/IXJNeK68SHqpQiXr', 'FYDProto');
// script/common/FYDProto.js

"use strict";

var pbjs = require("protobufjs");
var FYDProto = {};

FYDProto.Init = function () {
    var self = this;
    var root = require("protocol");
    self.C2GS = root.C2GS;
    self.GS2C = root.GS2C;
};

FYDProto.encode = function (data) {
    var self = this;
    var msg = new self.C2GS(data);

    return msg.encode().toBuffer();
};

FYDProto.decode = function (buffer) {
    var self = this;
    return self.GS2C.decode(buffer).encodeJSON();
};
module.exports = FYDProto;

cc._RFpop();