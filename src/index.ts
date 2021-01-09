import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception ', error);
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  console.log('API triggered!!');
  res.send('Server check');
  res.end();
});

const startServer = (): void => {
  console.log('process.env.PORT = ', process.env.PORT);
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
  http.createServer(app).listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

startServer();
