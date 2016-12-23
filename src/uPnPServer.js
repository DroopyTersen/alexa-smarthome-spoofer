var dgram = require("dgram");
var UPnP = {
    ip: "239.255.255.250",
    port: 1900
};
var tempSockets = [];
exports.start = function (devices) {

    var socket = dgram.createSocket({
        type: 'udp4',
        reuseAddr: true
    })

    socket.bind(UPnP.port);

    socket.on('message', function onSocketMessage(msg, req) {
        msg = msg.toString();
        if (msg.startsWith("M-SEARCH") && msg.indexOf("Belkin") > -1) {
            devices.forEach(d => sendDeviceUrl(d, msg, req));
        }
    });

    socket.on('listening', function () {
        console.log("Joining UPnP Multicast group...")
        try {
            socket.addMembership(UPnP.ip);
            socket.setMulticastTTL(1)
            console.log("Success");
        } catch (e) {
            console.log("Unable to join multicast group for UPnP")
            console.log(e);
        }
    })

    var sendDeviceUrl = function(device, msg, req) {
        console.log(req);
        console.log(msg);
        var httpString = 
`HTTP/1.1 200 OK
CACHE-CONTROL: max-age=86400
DATE: ${(new Date()).toUTCString()}
EXT:
LOCATION: http://192.168.1.216:${device.port}/setup.xml
OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01
01-NLS: 905bfa3c-1dd2-11b2-8928-fd8aebaf491c
SERVER: Unspecified, UPnP/1.0, Unspecified
X-User-Agent: redsonic
ST: urn:Belkin:device:**
USN: uuid:Socket-1_0-221517K0101769::urn:Belkin:device:**`

        console.log(httpString);
        socket.send(httpString, 0, httpString.length, req.port, req.address, (err, bytes) => {
            if (err) console.log(err);
            else {
                console.log("REGISTERED " + device.name);
            }
        });
    };
    return socket;

}