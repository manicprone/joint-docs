import express from 'express';
import appConfig from '../config/app-config';

const basePathDocs = appConfig.basePaths.docs || '';
const defaultSection = appConfig.appSettings.defaultSection;
const rootPages = appConfig.appSettings.rootPages;

// -----------------------------------------------------------------------------
// App Navigation
// -----------------------------------------------------------------------------
// /          => (Splash Page) source | docs => about/overview
//
// /about     => Overview | License | Source | Author's Note
//
// /guide     => Installation | Conceptual Walkthrough | A Joint in Practice | Dev Guides
//
// /api       => Constructor | Instance | Actions | et al
//
// /examples  => (inline code examples, list of links to running apps)
// -----------------------------------------------------------------------------

const router = express.Router();

router.get('*', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

router.route('/')
  .get((req, res) => {
    res.render('splash');
  });

router.route(`${basePathDocs}/:section?/:content?`)
  .get((req, res) => {
    const section = req.params.section || defaultSection;
    let content = req.params.content;
    const defaultRootPage = rootPages[section];

    // Handle request when page is not specified
    if (!content) {
      if (defaultRootPage !== 'index') return res.redirect(`${basePathDocs}/${section}/${defaultRootPage}`);
      content = defaultRootPage; // the special "index" case
    }

    // Prepare context info for all templates
    const contentURI = `${section}/${content}`;
    const leadingURI = `${basePathDocs}/${section}`;
    const context = { section, content, rootURI: basePathDocs, leadingURI };

    return res.render(contentURI, context, (err, html) => {
      if (err) {
        // On invalid uri, redirect to fall-back (default) section/page
        return res.redirect(`${basePathDocs}/${defaultSection}/${rootPages[defaultSection]}`);
      }
      return res.send(html);
    });
  });

router.route('*')
  .get((req, res) => {
    res.redirect('/');
  });

module.exports = router;
