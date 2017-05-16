let CCArray = function(temp_array){

    let array = {}

    array.init = function(temp_array) {
        let self = this;
        if(temp_array){
            self.cells = temp_array;
        }else{
            self.cells = [];
        }
    }
    //将元素插入指定位置
    array.insert = function(index, item) { 
        let self = this; 
        self.cells.splice(index, 0, item); 
    }

    //将元素放到数组末尾
    array.push = function(item) {
        let self = this;
        self.cells.push(item);
    }

    //获取指定下标的元素
    array.at = function(index) {
        let self = this;
        return self.cells[index];
    }

    //获取元素的下标
    array.indexof = function(item) {
        let self = this;
        for (var i = 0; i < self.cells.length; i++) {
            if (self.cells[i] === item) return i;
        }
        return -1;
    }

    //删除指定元素
    array.remove = function(item) {
        let self = this;
        let index = self.indexof(item);
        if (index != -1) {
            return self.cells.splice(index, 1);
        }
        
        return ;
    }

    //删除制定下标的元素并返回
    array.removeByIndex = function(index) {
        let self = this;
        let item = self.cells[index];
        if(item){
            self.cells.splice(index, 1);
            return item;
        }
        return ;
    }

    //删除数组第一个元素并返回
    array.removefirst = function() {
        let self = this;
        let item = self.cells.shift();
        if(item){
            return item;
        }
        return ;
    }
    //删除数组的最后一个元素并返回
    array.pop = function() {
        let self = this;
        let item = self.cells.pop();
        if(item) {
            return item;  
        }
        return ;
    }

    //获取数组长度
    array.length = function() {
        let self = this;
        return self.cells.length;
    }

    array.init(temp_array);
    return array;
}

module.exports = CCArray;