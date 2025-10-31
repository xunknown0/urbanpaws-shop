const express = require('express');
const router = express.Router({mergeParams: true});

/* GET reviews index /products/:id/reviews */
router.get('/', (req, res, next) => {
  res.send('/reviews');
});

/* POST reviews CREATE /products/:id/reviews */
router.post('/', (req, res, next) => {
  res.send('CREATE /reviews');
});

/* GET reviews EDIT  /products/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /reviews');
});

/* PUT reviews UPDATE /reviews/id */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /reviews/id');
});

/* DELETE reviews DELETE /reviews/id */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /reviews/:id');
});


module.exports = router;
