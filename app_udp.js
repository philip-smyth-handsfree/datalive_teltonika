import dgram from 'node:dgram';

const udpPort = 5000
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  logger.error(`UDP server error:\n${err.stack}`);
  server.close();
});

server.on('message', async (msg, rinfo) => {
  const today = new Date();
  logger.info(`** ---- UDP server a new packet: ${msg} (msg length: ${msg.length}) from ${rinfo.address}:${rinfo.port}, at: ${today}`);
});