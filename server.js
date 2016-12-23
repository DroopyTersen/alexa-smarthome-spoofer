var dgram = require("dgram");
var config = {
    ip: "239.255.255.250",
    port: 1900
};

function createSocket() {

    var socket = dgram.createSocket({
        type: 'udp4',
        reuseAddr: true
    })
    socket.bind(config.port);

    socket.on('message', function onSocketMessage(msg, req) {
        msg = msg.toString();
        if (msg.startsWith("M-SEARCH")) handleDeviceSearch(msg, req)
    });

    socket.on('listening', function () {
        console.log("Joining UPnP Multicast group...")
        try {
            socket.addMembership(config.ip);
            socket.setMulticastTTL(1)
            console.log("Success");
        } catch (e) {
            console.log("Unable to join multicast group for UPnP")
            console.log(e);
        }
    })

 
    var handleDeviceSearch = function(msg, req) {
        console.log(msg);
    }
}

createSocket();