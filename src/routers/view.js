import express from 'express';

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

router.route('/guide/:page?')
  .get((req, res) => {
    const page = req.params.page || 'start';
    const pageURI = `guide/${page}`;
    const context = { message: 'dynamic data here' };

    res.render(pageURI, context);
  });

// router.route('api')
//   .get((req, res) => {
//     res.render('api');
//   });
//
// router.route('examples')
//   .get((req, res) => {
//     res.render('api');
//   });

module.exports = router;
