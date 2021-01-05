import express from 'express';
import http from 'http';

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception ', error);
});

const app = express();

app.get('/', (req, res) => {
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
