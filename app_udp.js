var dgram = require('dgram');
const Parser = require('./index_udp.js');

const udpPort = 5000
const server = dgram.createSocket('udp4');

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
    console.log(parser)
    console.log('####')


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