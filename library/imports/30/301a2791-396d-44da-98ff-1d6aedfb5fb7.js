'use strict';

var CCArray = require("CCArray");
var csv = {};

csv.ParseCSV = function (content) {

    var temp = content.split('\n');
    var types = temp[1].split(',');
    var fileds = temp[2].split(',');
    var config = [];
    for (var id = 3; id < temp.length; id++) {
        var values = temp[id].split(',');
        var cell = {};
        for (var index in values) {

            var key = fileds[index];
            var type = types[index];
            var value = values[index];
            if (type == 'number') {
                value = parseFloat(value);
            } else if (type == 'boolean') {
                value = value == '1';
            }
            cell[key] = value;
        }
        config.push(cell);
    }
    return config;
};

module.exports = csv;