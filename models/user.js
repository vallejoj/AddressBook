const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {
  JWT_SECRET
} = require('../config/config.js');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE is not a valid email}`
    },
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['firstName', 'lastName',
    'email', '_id'
  ]);
};



// hash user password before saving into database
UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// statics/method to compare passwords and handle errors
UserSchema.statics.loginByEmail = function (email, password) {
  const User = this;
  return User.findOne({
    email
  }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return bcrypt.compare(password, user.password).then(res => {
      if (res) {
        return Promise.resolve(user);
      } else {
        return Promise.reject();
      }
    }).catch(err => {
      return Promise.reject();
    });
  });
};

// method to create our token
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id,
    access
  }, JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{
    access,
    token
  }]);

  return user.save().then(() => {
    return token;
  });
};

// statics/method user to find user by token
UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return Promise.reject();
  }

  console.log("decode", decoded);

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });

};
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};