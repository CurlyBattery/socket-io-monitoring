import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http from 'http';
import {Server} from 'socket.io';

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



io.on('connection', (socket) => {
  console.log('Пользователь подключился')

  // Обработка сообщения от клиента
  socket.on('message', (msg) => {
    console.log('Получено сообщение:', msg);
    // Отправляем сообщение обратно клиенту (эхо)
    socket.emit('message', msg.toString() + ' от сервера');
  });

  socket.on('disconnect', () => {
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


