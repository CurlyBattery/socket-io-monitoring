import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

import routes from './routes/index.js';
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.handler.js";

const app = express();

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

