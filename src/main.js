import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http from 'http';
import {Server} from 'socket.io';
import Room from './room.js';

const room = new Room();

import routes from './routes/routes.js';
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.handler.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {cors: {origin: '*'}});

app.use(bodyParser.json());
app.use(logger);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(routes);
app.use(errorHandler);

app.use(function(_, response) {
  response.render('index');
});

const PORT = 9091;

io.on('connection', async (socket) => {
  const roomID= await room.joinRoom();
  socket.join(roomID);
  console.log('Пользователь подключился')

  // Обработка сообщения от клиента
  socket.on('send-message', (message) => {
    console.log('Получено сообщение:', message);
    // Отправляем сообщение обратно клиенту (эхо)
    io.to(roomID).emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    room.leaveRoom(roomID);
    console.log('Пользователь отключился')
  })
})

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`));

httpServer.listen(9090, err => {
  if (err) {
    console.log('Well, this didn\'t work...');
    process.exit();
  }
  console.log('Web Socket Server is listening on port 9090');
});


