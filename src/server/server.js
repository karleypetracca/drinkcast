const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (client) => {
  console.log('client connected');
  client.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, (err) => {
  if (err) throw err;
  console.log('listening on port 8000');
});
