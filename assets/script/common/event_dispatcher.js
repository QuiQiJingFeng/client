let EventDisPatcher = function(){
    let event_dispatcher = {}

    event_dispatcher.Init = function() {
        let self = this;
        self.handlers = {}
    }

    event_dispatcher.RegisterEvent = function(event_name,handle) {
        let self = this;
        let prehandle = self.handlers[event_name] 
        if(prehandle) {
            cc.log("WARNING: EVENT ARRADY EXIST");
        }
        self.handlers[event_name] = handle
    }

    event_dispatcher.DispatchEvent = function(event_name,param1,param2,param3) {
        let self = this;
        let handle = self.handlers[event_name]
        if(!handle) return;
        return handle(param1,param2,param3);
    }

    event_dispatcher.RemoveEventListener = function(event_name) {
        let self = this;
        self.handlers[event_name] = null;
    }

    event_dispatcher.RemoveAllEventListener = function() {
        let self = this;
        self.handlers = {};
    }
    return event_dispatcher;
}

module.exports = EventDisPatcher;