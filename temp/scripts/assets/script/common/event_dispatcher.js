"use strict";
cc._RFpush(module, '9189bJcoTNHWI1YArsdG5nd', 'event_dispatcher');
// script/common/event_dispatcher.js

"use strict";

var event_dispatcher = {};

event_dispatcher.Init = function () {
    var self = this;
    self.handlers = {};
};

event_dispatcher.RegisterEvent = function (event_name) {
    var self = this;
    var handle = self.handlers[event_name];
    if (handle) {
        cc.log("WARNING: EVENT ARRADY EXIST");
    }
    self.handlers[event_name] = handle;
};

event_dispatcher.DispatchEvent = function (event_name) {
    var self = this;
    var handle = self.handlers[event_name];
    if (!handle) return;

    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
    }

    return handle.apply(undefined, data);
};

event_dispatcher.RemoveEventListener = function (event_name) {
    var self = this;
    self.handlers[event_name] = null;
};

event_dispatcher.RemoveAllEventListener = function () {
    var self = this;
    self.handlers = {};
};

module.exports = event_dispatcher;

cc._RFpop();