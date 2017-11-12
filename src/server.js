import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import compression from 'compression';
import nunjucks from 'nunjucks';
import serverConfig from './config/server-config';
import appConfig from './config/app-config';
import viewRouter from './routers/view';

const appName = appConfig.name;
const appAlias = appConfig.alias;
const basePath = serverConfig.basePaths;

const app = express();

// -----------------------------------------------------
// Add support for parsing cookies and form post data...
// -----------------------------------------------------
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------
// Configure templating engine...
// ------------------------------
const viewDirs = [
  `${__dirname}/templates`,
  `${__dirname}/pages`,
];
app.set('views', viewDirs);
app.set('view engine', 'njk');
nunjucks.configure(app.get('views'), {
  autoescape: true,
  noCache: true,
  // watch: true,
  express: app,
});

// --------------------
// Load router logic...
// --------------------
app.use('/', viewRouter);
app.disable('view cache');

// --------------------------------
// Configure static repositories...
// --------------------------------
app.use(compression({ threshold: 0 }));
app.use(favicon('./public/3d-box-48.png'));
app.use(basePath.assets, express.static('./public'));

// -----------------
// Serve requests...
// -----------------
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`${appName} is available`);
});

// ---------------
// Start server...
// ---------------
const port = serverConfig.port;
app.listen(port, () => {
  console.info('================================');
  console.info(`${appName} is running`);
  console.info('--------------------------------');
  console.info(`host:  localhost:${port}`);
  console.info(`alias: ${appAlias}`);
  console.info('================================');
  console.info('');
});
