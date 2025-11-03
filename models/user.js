const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  image: String,
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

// Adds username, hash, salt fields + helper methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
