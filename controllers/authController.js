const User = require('../models/user');
const passport = require('passport');

module.exports = {

  //userRegister
  async userRegister(req, res, next) {
    try {
      const data = Object.keys(req.body).length ? req.body : req.query;

      const newUser = new User({
        username: data.username,
        email: data.email,
        image: data.image
      });

      await User.register(newUser, data.password);
      console.log('User registered successfully!');
      res.redirect('/');
    } catch (err) {
      if (err.name === 'UserExistsError') {
        console.error('Username or email already registered.');
        return res.status(400).send('A user with that username or email already exists.');
      }

      if (err.code === 11000) {
        console.error('Duplicate email detected.');
        return res.status(400).send('That email is already registered.');
      }

      console.error('Registration error:', err);
      next(err);
    }
  },

  
  //userLogin
  userLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        req.flash('error', 'Invalid username or password.');
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome back!');
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },

  //userLogout
  userLogout (req, res, next) {
    req.logout((err) => {
        if (err) { 
            console.error('Logout error:', err);
            return next(err); 
        }
        req.flash('success', 'You have logged out successfully.');
        res.redirect('/');
    });
  }
};
