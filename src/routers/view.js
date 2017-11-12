import express from 'express';

const router = express.Router();

router.route('/install')
  .get((req, res) => {
    const context = {
      message: 'dynamic data here',
    };
    res.render('installation/install', context);
  });

module.exports = router;
