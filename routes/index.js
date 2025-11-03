const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userLogout } = require('../controllers/authController');
const { asyncErrorHandler } = require('../middleware/errorHandler'); 

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'UrbanPaws Shop- Home' });
});

/* GET register*/
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

/* POST /register */
router.post('/register', asyncErrorHandler(userRegister));


/* GET login*/
router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Please log in first.');
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.user }); // or res.send('Welcome to dashboard');
});

/* POST login */
router.post('/login',userLogin );

/* GET logout */

router.get('/logout',userLogout );



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
