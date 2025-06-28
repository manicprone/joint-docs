const path = require('path')
const fs = require('fs-extra')
const nunjucks = require('nunjucks')
const appConfig = require('./src/config/app-config')

// Configuration
const basePathDocs = appConfig.basePaths.docs || ''
const defaultSection = appConfig.appSettings.defaultSection
const rootPages = appConfig.appSettings.rootPages
const sections = Object.keys(rootPages).filter(section => section !== 'advanced') // Skip advanced section

// Setup Nunjucks with same configuration as Express app
const viewDirs = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components'),
  path.join(__dirname, 'src/content')
]

const env = nunjucks.configure(viewDirs, {
  autoescape: true,
  noCache: true
})

// Helper function to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirpSync(dir)
  }
}

// Helper function to write HTML file
function writeHtmlFile(filePath, html) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, html)
  console.log(`✓ Generated: ${filePath}`)
}

// Helper function to copy static assets
function copyStaticAssets() {
  console.log('\n📁 Copying static assets...')
  
  // Copy public assets
  if (fs.existsSync('./public')) {
    fs.copySync('./public', './dist/public')
    console.log('✓ Copied: public/ → dist/public/')
  }
  
  // Copy styles
  if (fs.existsSync('./src/styles')) {
    fs.copySync('./src/styles', './dist/styles')
    console.log('✓ Copied: src/styles/ → dist/styles/')
  }
}

// Build splash page
function buildSplashPage() {
  console.log('\n🏠 Building splash page...')
  try {
    const html = env.render('splash.njk')
    writeHtmlFile('./dist/index.html', html)
  } catch (error) {
    console.error('✗ Error building splash page:', error.message)
  }
}

// Build section pages
function buildSectionPages() {
  console.log('\n📚 Building section pages...')
  
  sections.forEach(section => {
    console.log(`\n  📖 Section: ${section}`)
    
    // Get all content files for this section
    const contentDir = path.join(__dirname, 'src/content', section)
    if (!fs.existsSync(contentDir)) {
      console.log(`    ⚠️  No content directory found for section: ${section}`)
      return
    }
    
    const contentFiles = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.njk'))
      .map(file => file.replace('.njk', ''))
    
    // For sections that have an index template, only build that
    if (contentFiles.includes('index')) {
      try {
        const contentURI = `${section}/index`
        const leadingURI = `${basePathDocs}/${section}`
        const context = { 
          section, 
          content: 'index', 
          rootURI: basePathDocs, 
          leadingURI 
        }
        
        // Render the index template with proper context
        const html = env.render(`${contentURI}.njk`, context)
        
        // Create directory structure
        const outputPath = `./dist${basePathDocs}/${section}/index.html`
        writeHtmlFile(outputPath, html)
        
      } catch (error) {
        console.error(`    ✗ Error building ${section}/index:`, error.message)
      }
    } else {
      // For sections without an index template, build all individual templates
      const defaultRootPage = rootPages[section]
      if (defaultRootPage !== 'index' && !contentFiles.includes(defaultRootPage)) {
        contentFiles.unshift(defaultRootPage)
      }
      
      contentFiles.forEach(content => {
        try {
          const contentURI = `${section}/${content}`
          const leadingURI = `${basePathDocs}/${section}`
          const context = { 
            section, 
            content, 
            rootURI: basePathDocs, 
            leadingURI 
          }
          
          // Render the content template with proper context
          const html = env.render(`${contentURI}.njk`, context)
          
          // Create directory structure
          const outputPath = `./dist${basePathDocs}/${section}/${content}/index.html`
          writeHtmlFile(outputPath, html)
          
        } catch (error) {
          console.error(`    ✗ Error building ${section}/${content}:`, error.message)
          // Log more details for debugging
          if (error.message.includes('template not found')) {
            console.error(`      Template path attempted: ${section}/${content}.njk`)
          }
        }
      })
    }
  })
}

// Build 404 page (redirect to home)
function build404Page() {
  console.log('\n🚫 Building 404 page...')
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Page Not Found</title>
    <meta http-equiv="refresh" content="0;url=/">
</head>
<body>
    <p>Redirecting to <a href="/">home page</a>...</p>
</body>
</html>`
  
  writeHtmlFile('./dist/404.html', html)
}

// Main build function
async function build() {
  console.log('🚀 Starting static site build...')
  console.log('================================')
  console.log('📝 Note: Advanced section is excluded from build')
  
  // Clean and create dist directory
  if (fs.existsSync('./dist')) {
    fs.removeSync('./dist')
  }
  fs.mkdirpSync('./dist')
  
  // Build all pages
  buildSplashPage()
  buildSectionPages()
  build404Page()
  
  // Copy static assets
  copyStaticAssets()
  
  console.log('\n✅ Build completed successfully!')
  console.log('📁 Static files generated in: ./dist/')
  console.log('🌐 You can now deploy the contents of ./dist/ to any CDN or static hosting service.')
}

// Run build if this script is executed directly
if (require.main === module) {
  build().catch(error => {
    console.error('❌ Build failed:', error)
    process.exit(1)
  })
}

module.exports = { build } 