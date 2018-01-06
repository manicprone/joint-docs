import express from 'express';
import appConfig from '../config/app-config';

const basePaths = appConfig.basePaths;

// -----------------------------------------------------------------------------
// Main Nav:
//
// /          => splash page (source | overview)
//
// /overview  => brief intro & features + diagrams
//
// /guide     => Getting Started / The Joint Concept / Joint in Practice + Dev Guides
//
// /api       => Constructor / Instance / Actions, et al
//
// /examples  => inline examples, list of links to running apps, etc
// -----------------------------------------------------------------------------
// Notes:
//
// + Remove "The Joint Concept" guide, instead just describe the concept
//   in the  Overview section.
// -----------------------------------------------------------------------------

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('splash');
  });

router.route(`${basePaths.docs}/:section?/:content?`)
  .get((req, res) => {
    const section = req.params.section || 'overview';
    const content = req.params.content || 'start';
    const contentURI = `${section}/${content}`;
    const leadingURI = `${basePaths.docs}/${section}`;
    const context = { section, content, rootURI: basePaths.docs, leadingURI };

    res.render(contentURI, context);
  });

module.exports = router;
