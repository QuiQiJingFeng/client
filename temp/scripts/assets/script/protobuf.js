"use strict";
cc._RFpush(module, 'caa46eriFBHarO1SkMa71zz', 'protobuf');
// script/protobuf.js

'use strict';

var pbjs = require("protobufjs");
require('buffer');
var HEADER_SIZE = 2;
var C2GS, GS2C;

var protobuf = module.exports;

protobuf.Init = function () {
   var self = this;
   cc.loader.loadRes('protocol.json', function (err, res) {
      if (err) {
         cc.log("ERROR:PROTO INIT", err);
         return;
      }
      // var obj = JSON.stringify(res)
      var root = pbjs.Root.fromJSON(res);
      C2GS = root.lookup("C2GS");
      GS2C = root.lookup("GS2C");

      var buffer = self.encode({
         login: {
            account: "zhanghu",
            password: "mima",
            platform: "appstore",
            version: "1.0.0",
            server_id: 1,
            device_id: "XEG-4L",
            device_type: "MI4",
            channel: "appstore",
            locale: "zh-CN",
            net_mode: "3G",
            device_platform: "IOS"
         }
      });

      // var msg = protobuf.decode(buffer);
      // cc.log("data=>",JSON.stringify(msg));

   });
};

protobuf.encode = function (data) {
   var msg = C2GS.fromObject(data);
   var buffer = C2GS.encode(msg).finish();
   console.log("buffer ==>", buffer);
   //添加包头
   var size = buffer.length;
   var headBuf = new Buffer(HEADER_SIZE);
   headBuf.writeUInt16BE(size, 0);
   console.log("headBuf ==>", buffer);
   var newBuffer = Buffer.concat([headBuf, buffer], size + HEADER_SIZE);
   return newBuffer;
};

protobuf.decode = function (buffer) {
   var size = buffer.length;

   if (size < HEADER_SIZE) {
      return null;
   }

   console.log("origin buffer =>\n", buffer);
   var s = buffer.slice(0, HEADER_SIZE).readInt16BE();

   //如果数据没有接收完整
   if (size < s + HEADER_SIZE) {
      return null;
   }

   var data = new Buffer(s);
   buffer.slice(HEADER_SIZE, HEADER_SIZE + 1 + s).copy(data);

   var msg = C2GS.decode(data);
   return msg;
};

cc._RFpop();