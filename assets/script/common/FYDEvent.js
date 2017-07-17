let FYDEvent = function(){
    let Event = {}

    Event.Init = function() {
        let self = this;
        self.handlers = {}
    }

    Event.RegisterEvent = function(event_name,handle) {
        let self = this;
        let prehandle = self.handlers[event_name] 
        if(prehandle) {
            cc.log("WARNING: EVENT ARRADY EXIST");
        }
        self.handlers[event_name] = handle
    }

    Event.DispatchEvent = function(event_name,param1,param2,param3) {
        let self = this;
        let handle = self.handlers[event_name]
        if(!handle) return;
        return handle(param1,param2,param3);
    }

    Event.RemoveEventListener = function(event_name) {
        let self = this;
        self.handlers[event_name] = null;
    }

    Event.RemoveAllEventListener = function() {
        let self = this;
        self.handlers = {};
    }
    return Event;
}

module.exports = FYDEvent;