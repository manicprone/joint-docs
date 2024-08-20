const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const compression = require('compression')
const nunjucks = require('nunjucks')
const serverConfig = require('./config/server-config')
const appConfig = require('./config/app-config')
const viewRouter = require('./routers/view')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

const appName = appConfig.name
const appAlias = appConfig.alias
const basePath = serverConfig.basePaths

const app = express()

// --------------------------------------------------
// Add support for parsing cookies and form post data
// --------------------------------------------------
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ---------------------------
// Configure templating engine
// ---------------------------
const viewDirs = [
  path.join(__dirname, 'pages'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'content')
]
app.set('views', viewDirs)
app.set('view engine', 'njk')
nunjucks.configure(app.get('views'), {
  autoescape: true,
  noCache: true,
  // watch: true,
  express: app
})

// -----------------------------
// Configure static repositories
// -----------------------------
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/3d-box-48.png'))
app.use(basePath.assets, express.static('./public'))
app.use(basePath.styles, express.static('./src/styles'))

// -----------------
// Load router logic
// -----------------
app.use('/', viewRouter)
app.disable('view cache')

// ------------
// Start server
// ------------
const host = (isProd) ? serverConfig.host[env] : 'localhost'
const port = process.env.PORT || serverConfig.port[env]
app.listen(port, () => {
  console.info('================================')
  console.info(`${appName} is running`)
  console.info('--------------------------------')
  console.info(`host:  ${host}:${port}`)
  console.info(`alias: ${appAlias}`)
  console.info('================================')
  console.info('')
})

module.exports = app
