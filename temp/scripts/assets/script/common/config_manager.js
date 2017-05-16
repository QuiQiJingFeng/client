"use strict";
cc._RFpush(module, '1abbaE9+hBO7a2pB4aFjwyG', 'config_manager');
// script/common/config_manager.js

"use strict";

var csv = require("csv");
var utils = require("utils");

var config_manager = {};

config_manager.Init = function () {
    var self = this;

    utils.ReadFromFile("data/mercenary.csv", function (content) {
        self.mercenary = csv.ParseCSV(content);
        console.log("FYD===>\n", self.mercenary);
    });
};

config_manager.ReloadData = function () {};

module.exports = config_manager;

cc._RFpop();