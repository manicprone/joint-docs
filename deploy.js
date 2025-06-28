#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')

// Check if dist directory exists
function checkBuild() {
  if (!fs.existsSync('./dist')) {
    console.error('❌ No build found. Please run "npm run build" first.')
    process.exit(1)
  }
  console.log('✅ Build found in ./dist/')
}

// Deploy to Netlify
function deployToNetlify() {
  console.log('\n🚀 Deploying to Netlify...')
  
  // Check if netlify-cli is installed
  try {
    execSync('netlify --version', { stdio: 'ignore' })
  } catch (error) {
    console.error('❌ Netlify CLI not found. Please install it with: npm install -g netlify-cli')
    return
  }
  
  try {
    execSync('netlify deploy --dir=dist --prod', { stdio: 'inherit' })
    console.log('✅ Deployed to Netlify successfully!')
  } catch (error) {
    console.error('❌ Netlify deployment failed:', error.message)
  }
}

// Deploy to Vercel
function deployToVercel() {
  console.log('\n🚀 Deploying to Vercel...')
  
  // Check if vercel is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' })
  } catch (error) {
    console.error('❌ Vercel CLI not found. Please install it with: npm install -g vercel')
    return
  }
  
  try {
    execSync('vercel --prod', { stdio: 'inherit' })
    console.log('✅ Deployed to Vercel successfully!')
  } catch (error) {
    console.error('❌ Vercel deployment failed:', error.message)
  }
}

// Deploy to GitHub Pages
function deployToGitHubPages() {
  console.log('\n🚀 Deploying to GitHub Pages...')
  
  try {
    // Create a temporary branch for deployment
    execSync('git checkout -b gh-pages-temp', { stdio: 'ignore' })
    
    // Copy dist contents to root
    fs.copySync('./dist', './', { overwrite: true })
    
    // Add all files
    execSync('git add .', { stdio: 'ignore' })
    
    // Commit
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'ignore' })
    
    // Push to gh-pages branch
    execSync('git push origin gh-pages-temp:gh-pages', { stdio: 'inherit' })
    
    // Clean up
    execSync('git checkout main', { stdio: 'ignore' })
    execSync('git branch -D gh-pages-temp', { stdio: 'ignore' })
    
    console.log('✅ Deployed to GitHub Pages successfully!')
    console.log('📝 Note: You may need to enable GitHub Pages in your repository settings.')
    
  } catch (error) {
    console.error('❌ GitHub Pages deployment failed:', error.message)
  }
}

// Deploy to AWS S3
function deployToS3() {
  console.log('\n🚀 Deploying to AWS S3...')
  
  const bucketName = process.argv[3]
  if (!bucketName) {
    console.error('❌ Please provide an S3 bucket name: npm run deploy:s3 <bucket-name>')
    return
  }
  
  // Check if AWS CLI is installed
  try {
    execSync('aws --version', { stdio: 'ignore' })
  } catch (error) {
    console.error('❌ AWS CLI not found. Please install it first.')
    return
  }
  
  try {
    execSync(`aws s3 sync dist/ s3://${bucketName} --delete`, { stdio: 'inherit' })
    console.log(`✅ Deployed to S3 bucket: ${bucketName}`)
  } catch (error) {
    console.error('❌ S3 deployment failed:', error.message)
  }
}

// Show deployment options
function showHelp() {
  console.log(`
🚀 Joint Docs Deployment Options
================================

Available commands:
  npm run deploy:netlify    - Deploy to Netlify
  npm run deploy:vercel     - Deploy to Vercel  
  npm run deploy:github     - Deploy to GitHub Pages
  npm run deploy:s3 <bucket> - Deploy to AWS S3

Prerequisites:
  - Run "npm run build" first to generate static files
  - Install the appropriate CLI tool for your chosen platform

Examples:
  npm run build && npm run deploy:netlify
  npm run build && npm run deploy:s3 my-docs-bucket
`)
}

// Main function
function main() {
  const command = process.argv[2]
  
  checkBuild()
  
  switch (command) {
    case 'netlify':
      deployToNetlify()
      break
    case 'vercel':
      deployToVercel()
      break
    case 'github':
      deployToGitHubPages()
      break
    case 's3':
      deployToS3()
      break
    default:
      showHelp()
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  deployToNetlify,
  deployToVercel,
  deployToGitHubPages,
  deployToS3
} 