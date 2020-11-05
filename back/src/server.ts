import * as express from 'express';
import * as bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { APP_CONFIG } from './config/app.config';

const app = express();
app.use(bodyParser.json());

const port = APP_CONFIG.api.port;
const host = APP_CONFIG.api.host;
const pointUrl = APP_CONFIG.comiv_vine_api.host;

app.all('*', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(`${pointUrl}${req.url}`);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
  }
});

app.listen(port, () => {
  console.log(`Middleware listening at http://${host}:${port}`);
});
