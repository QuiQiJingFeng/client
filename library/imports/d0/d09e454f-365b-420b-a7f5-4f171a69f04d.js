"use strict";

var FYDEvent = function FYDEvent() {
    var Event = {};

    Event.Init = function () {
        var self = this;
        self.handlers = {};
    };

    Event.RegisterEvent = function (event_name, handle) {
        var self = this;
        var prehandle = self.handlers[event_name];
        if (prehandle) {
            cc.log("WARNING: EVENT ARRADY EXIST");
        }
        self.handlers[event_name] = handle;
    };

    Event.DispatchEvent = function (event_name, param1, param2, param3) {
        var self = this;
        var handle = self.handlers[event_name];
        if (!handle) return;
        return handle(param1, param2, param3);
    };

    Event.RemoveEventListener = function (event_name) {
        var self = this;
        self.handlers[event_name] = null;
    };

    Event.RemoveAllEventListener = function () {
        var self = this;
        self.handlers = {};
    };
    return Event;
};

module.exports = FYDEvent;