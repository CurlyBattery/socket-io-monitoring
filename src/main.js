import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http from 'http';
import socketIO from 'socket.io';

import routes from './routes/routes.js';
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.handler.js";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });


app.use(bodyParser.json());
app.use(logger);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(routes);
app.use(errorHandler);

app.use(function(_, response) {
  response.render('index');
})

const PORT = 9091;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`));

io.on('connection', (socket) => {

});