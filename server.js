var wemore = require('wemore');
var droopyIot = require("droopy-iot")
var iot = droopyIot.register("dennis");

var cornerLight  = wemore.Emulate({friendlyName: "Corner Light", port: 9001}); // choose a port

cornerLight.on('listening', function() {
    console.log("Corner Light listening on", this.port);
});

cornerLight.on('on', function() {
    iot.trigger("toggle-power", { outlet: "five", state: true }, "horace")
    console.log("Corner Light turned on");
});

cornerLight.on('off', function() {
    iot.trigger("toggle-power", { outlet: "five", state: false }, "horace")
    console.log("Corner light turned off");
});
