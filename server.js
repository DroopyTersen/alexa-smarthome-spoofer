// var devices = [
//     {
//         host: "http://192.168.1.216",
//         port: 9999,
//         name: "fish tank",
//         id: "6698b880-cf96-4ce6-b27f-bc9ea5f5c3bd"
//     }
// ];

// var DeviceServer = require("./src/deviceServer");
// var server = require("./src/uPnPServer");
// server.start(devices);
// var deviceServer = new DeviceServer(devices[0]);

var wemore = require('wemore');

// note that each device needs a separate port:
var tv = wemore.Emulate({friendlyName: "TV", port: 9001}); // choose a port
var stereo = wemore.Emulate({friendlyName: "Stereo", port: 5001}); // automatically assigned

stereo.on('listening', function() {
    // if you want it, you can get it:
    console.log("Stereo listening on", this.port);
});

tv.on('state', function(binaryState) {
    console.log("TV set to=", binaryState);
    tv.close(); // stop advertising the device
});

// also, 'on' and 'off' events corresponding to binary state
stereo.on('on', function() {
    console.log("Stereo turned on");
});

stereo.on('off', function() {
    console.log("Stereo turned off");
});