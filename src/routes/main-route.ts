import { Router } from 'express';
import path from 'path';
import { copyFileSync, existsSync, unlinkSync, writeFileSync } from 'fs';

const routes = Router();

routes.get('/', (req, res) => {
  console.log('API triggered!!');
  res.send('Server check');
  res.end();
});

routes.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'pages', 'exists.html');
  res.sendFile(filePath);
});

routes.post('/create', async (req, res) => {
  const title: string = req.body.title;
  const content: string = req.body.text;

  const adjTitle: string = title.toLowerCase();

  const tempFilePath: string = path.join(__dirname, '..', '..', 'temp', adjTitle + '.txt');
  const finalFilePath: string = path.join(__dirname, '..', '..', 'feedback', adjTitle + '.txt');

  await writeFileSync(tempFilePath, content);
  if (existsSync(finalFilePath)) {
    res.redirect('/exists.html');
  } else {
    await copyFileSync(tempFilePath, finalFilePath);
    await unlinkSync(tempFilePath);
    res.redirect('/feedback.html');
  }
});
export = routes;
