"use strict";

var utils = {};

utils.SendPostRequest = function (ServerLink, data, callback, errcall) {
    var post_data = JSON.stringify(data);
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", ServerLink);
    //xhr.open("GET", ServerLink+link+"?"+parm,false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(post_data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            callback(xhr.responseText);
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            errcall(xhr.status);
        }
    };
};

utils.GetPlatform = function () {
    var platform = "";
    if (!cc.sys.isNative) {
        data.platform = 'browser-' + cc.sys.browserType;
    } else {
        data.platform = cc.sys.os; //browser windows android ios         
    }
    return platform;
};

module.exports = utils;