# Joint Kit Docs

Online documentation for the Joint Kit solution.

<br />

## WIP

Not ready for public use until joint-kit version 0.1.0 - Syntax and logic are in frequent flux.

<br />

## Table of Contents

* [The Software Stack][section-the-software-stack]
* [Development][section-development]
* [Build & Deployment][section-build-deployment]
* [Dev Lint][section-dev-lint]


## The Software Stack

<br />

| Layer | Implementation |
| ----- | -------------- |
| Language | JavaScript ES6 |
| Templating Engine | Nunjucks |
| Server Framework | Express |
| Core Utilities | Lodash |
| Linting | ESLint (airbnb) |


## Development

### Running the Development Server

``` sh
$ npm run dev
```

This starts the Express development server with hot reloading.

### Building Static Site

To generate a static version of the documentation for CDN deployment:

``` sh
$ npm run build
```

This creates a `dist/` directory containing all static HTML files and assets that can be deployed to any CDN or static hosting service.

## Build & Deployment

The documentation can be built into static files and deployed to various CDN and hosting services.

### Build Process

The build process:
1. Renders all Nunjucks templates to static HTML
2. Maintains the same URL structure as the Express app
3. Copies all static assets (CSS, images, etc.)
4. Generates a 404 page for handling missing routes

### Deployment Options

#### Netlify
``` sh
$ npm run build
$ npm run deploy:netlify
```

#### Vercel
``` sh
$ npm run build
$ npm run deploy:vercel
```

#### GitHub Pages
``` sh
$ npm run build
$ npm run deploy:github
```

#### AWS S3
``` sh
$ npm run build
$ npm run deploy:s3 <your-bucket-name>
```

### Manual Deployment

You can also manually deploy the contents of the `dist/` directory to any static hosting service:

- **Cloudflare Pages**: Drag and drop the `dist/` folder
- **Firebase Hosting**: Use `firebase deploy`
- **Any CDN**: Upload the contents of `dist/` to your CDN

### Build Output Structure

```
dist/
├── index.html              # Home page
├── 404.html               # 404 error page
├── docs/                  # Documentation pages
│   ├── about/
│   ├── guide/
│   ├── api/
│   ├── advanced/
│   └── examples/
├── styles/                # CSS files
└── public/                # Static assets (images, etc.)
```

## Dev Lint

The app uses [ESLint][link-eslint-site] for source code linting. The linting will run automatically on `git commit`.

``` sh
$ npm run lint
```


[section-the-software-stack]: #the-software-stack
[section-development]: #development
[section-build-deployment]: #build--deployment
[section-dev-lint]: #dev-lint

[link-eslint-site]: https://eslint.org
