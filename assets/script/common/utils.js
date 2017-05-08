let utils = {};

utils.SendPostRequest = function (server_path,data,callback) {
    var post_data = JSON.stringify(data);
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", server_path);
       //xhr.open("GET", ServerLink+link+"?"+parm,false);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(post_data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200)) {            
            var result = xhr.responseText;
            callback(xhr.responseText);
        }else if(xhr.readyState == 4 && (xhr.status != 200)) {
            cc.log("error state ",xhr.status,server_path);
        }
    };
}

utils.GetPlatform = function() {
    let platform = "";
    if(!cc.sys.isNative){
        platform = 'browser-' + cc.sys.browserType;
    }else{
        platform = cc.sys.os;         //browser windows android ios         
    }
    return platform;
}

utils.Hide = function() {
    for(let i = 0;i < arguments.length; i++) {     //如果有，就累加  
        arguments[i].active = false;
    }
}

utils.Show = function() {
    for(let i = 0;i < arguments.length; i++) {     //如果有，就累加  
        arguments[i].active = true;
    } 
}

module.exports = utils;
