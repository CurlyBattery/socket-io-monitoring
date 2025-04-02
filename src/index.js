import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({msg: 'Hello World'});
});

const PORT = 9091;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

