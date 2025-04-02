import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

import routes from './routes/routes.js';
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.handler.js";

const main = express();

main.use(bodyParser.json());
main.use(logger);
main.engine('html', ejs.renderFile);
main.set('view engine', 'html');

main.use(routes);
main.use(errorHandler);

main.use(function(_, response) {
  response.render('index');
})

const PORT = 9091;

main.listen(PORT, () => console.log(`Server started on port ${PORT}`));

