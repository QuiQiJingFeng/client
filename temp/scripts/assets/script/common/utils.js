"use strict";
cc._RFpush(module, 'cfa0antuCBGFoieIdSEZg1q', 'utils');
// script/common/utils.js

"use strict";

var utils = {};

utils.SendPostRequest = function (server_path, data, callback) {
    var post_data = JSON.stringify(data);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var result = request.responseText;
            callback(request.responseText);
        }
    };
    request.open("POST", server_path);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(post_data);
};

utils.SendGetRequest = function (url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            callback(response);
        }
    };
    request.open("GET", url, true);
    request.send();
};

utils.GetPlatform = function () {
    var platform = "";
    if (!cc.sys.isNative) {
        platform = 'browser-' + cc.sys.browserType;
    } else {
        platform = cc.sys.os; //browser windows android ios         
    }
    return platform;
};

utils.Hide = function () {
    for (var i = 0; i < arguments.length; i++) {
        //如果有，就累加  
        arguments[i].active = false;
    }
};

utils.Show = function () {
    for (var i = 0; i < arguments.length; i++) {
        //如果有，就累加  
        arguments[i].active = true;
    }
};

utils.ReadFromFile = function (file_name, callback) {
    cc.loader.loadRes(file_name, function (err, tex) {
        if (err) {
            cc.log("ReadFromFile ERROR:=>", err);
        } else {
            callback(tex);
        }
    });
};

module.exports = utils;

cc._RFpop();