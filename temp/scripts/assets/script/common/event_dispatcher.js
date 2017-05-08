"use strict";
cc._RFpush(module, '9189bJcoTNHWI1YArsdG5nd', 'event_dispatcher');
// script/common/event_dispatcher.js

"use strict";

var EventDisPatcher = function EventDisPatcher() {
    var event_dispatcher = {};

    event_dispatcher.Init = function () {
        var self = this;
        self.handlers = {};
    };

    event_dispatcher.RegisterEvent = function (event_name, handle) {
        var self = this;
        var prehandle = self.handlers[event_name];
        if (prehandle) {
            cc.log("WARNING: EVENT ARRADY EXIST");
        }
        self.handlers[event_name] = handle;
    };

    event_dispatcher.DispatchEvent = function (event_name, param1, param2, param3) {
        var self = this;
        var handle = self.handlers[event_name];
        if (!handle) return;
        return handle(param1, param2, param3);
    };

    event_dispatcher.RemoveEventListener = function (event_name) {
        var self = this;
        self.handlers[event_name] = null;
    };

    event_dispatcher.RemoveAllEventListener = function () {
        var self = this;
        self.handlers = {};
    };
    return event_dispatcher;
};

module.exports = EventDisPatcher;

cc._RFpop();