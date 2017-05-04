var protobuf = require("protobufjs")

//将相对url转为绝对url
var url = cc.url.raw( 'resources/protocol.json' )
cc.log("url==>>",url);
cc.loader.loadRes( url, function( err, res) {
// 如果有異常會在 err 變數顯示, 否則在res就會是讀進來的json object
cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify(res));
//JSON.stringify(res)是使用json库中的方法将json文件转换为字符串。
});
 
// var root = protobuf.Root.fromJSON(jsonDescriptor);




