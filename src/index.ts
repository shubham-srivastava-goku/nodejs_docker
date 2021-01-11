import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import router from './routes/main-route';

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception = ', error);
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('./pages'));
app.use(express.static('./public'));
app.use('/', router);

const startServer = (): void => {
  console.log('process.env.PORT = ', process.env.PORT);
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
  http.createServer(app).listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

startServer();
