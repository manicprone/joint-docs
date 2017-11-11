import express from 'express';

// -----------------------------------------------------------------------------
//                                                                  Router Logic
// -----------------------------------------------------------------------------

const router = express.Router();

// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

router.route('/test')
  .get((req, res) => {
    const data = { type: 'test-data', message: 'nice :)' };
    handleDataResponse(data, res, 200);
  });

// -----------------------------------------------------------------------------
//                                                             Response Handling
// -----------------------------------------------------------------------------

function handleDataResponse(data, res, status = 200) {
  res.status(status).json(data);
}

// function handleErrorResponse(error, res) {
//   const status = error.status || 500;
//   res.status(status).json(error);
// }

module.exports = router;
