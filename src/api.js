import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToTimer() {
  //   socket.on('timer', (timestamp) => cb(null, timestamp));
  //   socket.emit('subscribeToTimer', 1000);
  socket.on(console.log('hello!'));
  socket.emit();
}

export { subscribeToTimer };
