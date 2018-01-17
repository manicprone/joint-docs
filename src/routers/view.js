import express from 'express';
import appConfig from '../config/app-config';

const basePaths = appConfig.basePaths;

// -----------------------------------------------------------------------------
// Main Nav:
//
// /          => splash page (source | docs > about)
//
// /about     => Overview | License | Source | Author's Note
//
// /guide     => Getting Started / Conceptual Walkthrough / A Joint in Practice + Dev Guides
//
// /api       => Constructor / Instance / Actions, et al
//
// /examples  => inline examples, list of links to running apps, etc
// -----------------------------------------------------------------------------

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('splash');
  });

router.route(`${basePaths.docs}/:section?/:content?`)
  .get((req, res) => {
    const section = req.params.section || 'about';
    const content = req.params.content || 'start';
    const contentURI = `${section}/${content}`;
    const leadingURI = `${basePaths.docs}/${section}`;
    const context = { section, content, rootURI: basePaths.docs, leadingURI };

    res.render(contentURI, context);
  });

module.exports = router;
