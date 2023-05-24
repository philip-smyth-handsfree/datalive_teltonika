var dgram = require('dgram');
const Parser = require('./index_udp.js');

const udpPort = 5000
const server = dgram.createSocket('udp4');

function sendResponse(data, rinfo) {
  var message = data
  server.send(message, 0, message.length, rinfo.port, rinfo.address);
  console.log(rinfo.port, rinfo.address);
}

server.on('error', (err) => {
  console.log(`UDP server error:\n${err.stack}`);
  server.close();
});

server.on('message', async (msg, rinfo) => {
  const today = new Date();
  // console.log(`** ---- UDP server a new packet: ${msg} (msg length: ${msg.length}) from ${rinfo.address}:${rinfo.port}, at: ${today}`);

  try {
    // With a UDP Packet, we need to send back
    // Length - Packet ID - Not usable Byte 0x01 - AVL Packet ID - Number of accepted Data
    let buffer = msg;
    let parser = new Parser(buffer);
    sendResponse(parser._resp, rinfo)
    let avl = parser.getAvl();
    console.log(avl)
    console.log(avl.records.gps)
    console.log(avl.records.forEach(function(record){
        console.log(record.ioElements)
    }))


  } catch (error) {
    console.log(`** UDP ERROR **::\n${error}`);
  }
});

server.on('listening', () => {
  const address = server.address();
  // console.log(`UDP server listening ${address.address}:${address.port}`);
  console.log(`UDP server listening ${address.address}:${address.port}`);
});

server.bind(udpPort);