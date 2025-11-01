const express = require('express');
const router = express.Router();
const { userRegister } = require('../controllers/index');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'UrbanPaws Shop- Home' });
});

/* GET register*/
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

/* POST /register */
router.post('/register', userRegister);


/* GET login*/
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST login */
router.post('/login', (req, res, next) => {
  res.send('POST /login');
});

/* GET profile/:user_id*/
router.get('/profile', (req, res, next) => {
  res.send('GET /profile/:user_id');
});

/* POST profile/:user_id */
router.put('/profile', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

/* GET /forgot-pw*/
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot');
});

/* PUT /forgot-pw*/
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot');
});

/* GET /reset-pw/:token*/
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset-pw/:token');
});

/* PUT /reset-pw/:token*/
router.put('/reset/:token', (req, res, next) => {
  res.send('GET /reset-pw/:token');
});



module.exports = router;
