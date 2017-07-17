"use strict";
cc._RFpush(module, '45facRhf5ZPiY1nHeAH21hy', 'common');
// script/common/common.js

"use strict";

window.app = {};
app.Utils = require("FYDUtil");
app.Event = require("FYDEvent")();
app.Net = require("FYDNet");
app.Proto = require("FYDProto");
app.TableView = require("FYDTableView");
app.Const = require("FYDConst");

app.Event.Init();
app.Proto.Init();

cc._RFpop();