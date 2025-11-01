const User = require('../models/user');

module.exports = {
  userRegister(req, res, next) {
    // Accept from body or query for testing
    const data = Object.keys(req.body).length ? req.body : req.query;

    const newUser = new User({
      username: data.username,
      email: data.email,
      image: data.image
    });

    User.register(newUser, data.password, (err) => {
      if (err) {
        console.log('A user with this email already exists.', err);
        return next(err);
      }

      console.log('User Registered!');
      res.redirect('/');
    });
  }
};
