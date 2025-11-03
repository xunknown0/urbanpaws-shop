const User = require('../models/user');

module.exports = {
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
  }
};
