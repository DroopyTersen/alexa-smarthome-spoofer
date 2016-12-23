const http = require('http')
var DeviceServer = function (device) {
    this.device = device;
    const requestHandler = (req, res) => {
        console.log(req.url)
        if (req.url === "/setup.xml") {
            var xml = `<?xml version="1.0"?>
<root>
  <device>
    <deviceType>urn:DroopyDevice:device:controllee:1</deviceType>
    <friendlyName>fish tank</friendlyName>
    <manufacturer>Belkin International Inc.</manufacturer>
    <modelName>Droopy Smart Socket</modelName>
    <modelNumber>0.1</modelNumber>
    <UDN>uuid:Socket-1_0-20161222110400</UDN>
  </device>
</root>`
            console.log(xml);
            res.end(xml);
        } else {
            res.end('Hello Node.js Server!')

        }
    };

    const server = http.createServer(requestHandler)
    console.log(device.port);
    server.listen(device.port);
}

var net = require('net');

var DeviceServer = function (device) {
    net.createServer()
    this.server = net.createServer((c) => {
        // 'connection' listener
        console.log('client connected');
        c.on('end', () => {
            console.log('client disconnected');
        });
        var xml = `<?xml version="1.0"?>
<root>
  <device>
    <deviceType>urn:DroopyDevice:device:controllee:1</deviceType>
    <friendlyName>fish tank</friendlyName>
    <manufacturer>Belkin International Inc.</manufacturer>
    <modelName>Droopy Smart Socket</modelName>
    <modelNumber>0.1</modelNumber>
    <UDN>uuid:Socket-1_0-20161222110400</UDN>
  </device>
</root>`
            console.log(xml);
        c.write(xml);
        c.pipe(c);
    });
    this.server.listen(device.port, '192.168.1.216');
}

module.exports = DeviceServer;