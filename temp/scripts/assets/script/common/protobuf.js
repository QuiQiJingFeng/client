"use strict";
cc._RFpush(module, 'caa46eriFBHarO1SkMa71zz', 'protobuf');
// script/common/protobuf.js

"use strict";

var pbjs = require("protobufjs");
var protobuf = {};

protobuf.Init = function () {
    var self = this;
    var root = require("protocol");
    self.C2GS = root.C2GS;
    self.GS2C = root.GS2C;
};

protobuf.encode = function (data) {
    var self = this;
    var msg = new self.C2GS(data);

    return msg.encode().toBuffer();
};

protobuf.decode = function (buffer) {
    var self = this;
    return self.GS2C.decode(buffer);
};
module.exports = protobuf;

cc._RFpop();