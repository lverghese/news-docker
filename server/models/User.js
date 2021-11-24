const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const articleSchema = require('./Article');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
    savedArticles: [articleSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
});

// saving password middleware via bcrypt
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//compare password with hashed version
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when user is queried their exercises based on their article _id comes with it 
 userSchema.virtual('articleCount').get(function () {
   return this.savedArticles.length;
 });

const User = mongoose.model('User', userSchema);

module.exports = User;
