let event_dispatcher = {}

event_dispatcher.Init = function() {
    let self = this;
    self.handlers = {}
}

event_dispatcher.RegisterEvent = function(event_name) {
    let self = this;
    let handle = self.handlers[event_name] 
    if(handle) {
        cc.log("WARNING: EVENT ARRADY EXIST");
    }
    self.handlers[event_name] = handle
}

event_dispatcher.DispatchEvent = function(event_name,...data) {
    let self = this;
    let handle = self.handlers[event_name]
    if(!handle) return;

    return handle(...data);
}

event_dispatcher.RemoveEventListener = function(event_name) {
    let self = this;
    self.handlers[event_name] = null;
}

event_dispatcher.RemoveAllEventListener = function() {
    let self = this;
    self.handlers = {};
}

module.exports = event_dispatcher;