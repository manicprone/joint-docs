#!/usr/bin/env node

const express = require('express')
const path = require('path')
const fs = require('fs-extra')

const app = express()
const PORT = process.env.PORT || 3001

// Check if dist directory exists
if (!fs.existsSync('./dist')) {
  console.error('❌ No build found. Please run "npm run build" first.')
  process.exit(1)
}

// Serve static files from dist directory
app.use(express.static('./dist'))

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  // Check if the file exists
  const filePath = path.join(__dirname, 'dist', req.path)
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.sendFile(filePath)
  } else {
    // For routes that don't exist, serve the 404 page
    res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'))
  }
})

app.listen(PORT, () => {
  console.log('🚀 Static site server running!')
  console.log('================================')
  console.log(`📍 Local: http://localhost:${PORT}`)
  console.log('📁 Serving files from: ./dist/')
  console.log('')
  console.log('Press Ctrl+C to stop the server')
}) 