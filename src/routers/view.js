import express from 'express';
import appConfig from '../config/app-config';

const basePaths = appConfig.basePaths;

// -----------------------------------------------------------------------------
// Main Nav:
//
// /          => Splash Page
//
// /about     => Overview / License
//
// /guide     => Getting Started / The Joint Concept / Joint in Practice
//
// /api       => Constructor / Instance / Actions
//
// /examples  => inline examples, list of links to running apps, etc
// -----------------------------------------------------------------------------

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('splash');
  });

router.route(`${basePaths.docs}/:section/:content?`)
  .get((req, res) => {
    const section = req.params.section || 'guide';
    const content = req.params.content || 'start';
    const contentURI = `${section}/${content}`;
    const leadingURI = `${basePaths.docs}/${section}`;
    const context = { section, content, rootURI: basePaths.docs, leadingURI };

    res.render(contentURI, context);
  });

module.exports = router;
