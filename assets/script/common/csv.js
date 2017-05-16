let CCArray = require("CCArray");
let csv = {};

csv.ParseCSV = function (content){
    
    let temp = content.split('\n');
    let types = temp[1].split(',');
    let fileds = temp[2].split(',');
    let config = [];
    for(let id = 3;id < temp.length;id++){
        let values = temp[id].split(',');
        let cell = {};
        for(let index in values) {

            let key = fileds[index];
            let type = types[index];
            let value = values[index];
            if(type == 'number'){
                value = parseFloat(value);
            }else if(type == 'boolean'){
                value = (value == '1');
            }
            cell[key] = value;
        }
        config.push(cell);
    }
    return config;
}

module.exports = csv;