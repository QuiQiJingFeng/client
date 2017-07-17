"use strict";
cc._RFpush(module, 'f4955IspmdPoKP6Goj2bu6D', 'FYDUtil');
// script/common/FYDUtil.js

"use strict";

/*
    @author  FYD
    @date    2017.07.06
*/
var md5 = require('md5');
var FYDUtil = {};

FYDUtil.SendPostRequest = function (server_path, data, callback) {
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

FYDUtil.SendGetRequest = function (url, callback) {
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

FYDUtil.GetPlatform = function () {
    var platform = "";
    if (!cc.sys.isNative) {
        platform = 'browser-' + cc.sys.browserType;
    } else {
        platform = cc.sys.os; //browser windows android ios         
    }
    return platform;
};

FYDUtil.Hide = function () {
    for (var i = 0; i < arguments.length; i++) {
        //如果有，就累加  
        arguments[i].active = false;
    }
};

FYDUtil.Show = function () {
    for (var i = 0; i < arguments.length; i++) {
        //如果有，就累加  
        arguments[i].active = true;
    }
};

FYDUtil.ReadFromFile = function (file_name, callback) {
    cc.loader.loadRes(file_name, function (err, tex) {
        if (err) {
            cc.log("ReadFromFile ERROR:=>", err);
        } else {
            callback(tex);
        }
    });
};

FYDUtil.SetValueForKey = function (key, value) {
    cc.sys.localStorage.setItem(key, value);
};

FYDUtil.GetValueForKey = function (key) {
    return cc.sys.localStorage.getItem(key);
};

FYDUtil.GeneralAccount = function (key) {
    return md5('FYD' + Date.now() + parseInt(Math.random() * 1000, 10));
};

module.exports = FYDUtil;

cc._RFpop();