import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import compression from 'compression';
import serverConfig from './config/server-config';
import apiConfig from './config/api-config';
import testRoutes from './routers/test';

const appName = apiConfig.name;
const appAlias = apiConfig.alias;
const basePath = serverConfig.basePaths;

const app = express();

// -----------------------------------------------------
// Add support for parsing cookies and form post data...
// -----------------------------------------------------
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------
// Load API routers...
// -------------------
const apiBaseURI = basePath.api + apiConfig.path.module + apiConfig.path.version;
app.use(apiBaseURI, testRoutes);
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
