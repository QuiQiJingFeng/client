let csv = require("csv");
let utils = require("utils");

let config_manager = {};

config_manager.Init = function(){
    let self = this;
    
    utils.ReadFromFile("data/mercenary.csv",function(content){
       self.mercenary = csv.ParseCSV(content);
       console.log("FYD===>\n",self.mercenary);
    });
}

config_manager.ReloadData = function(){

}

module.exports = config_manager;