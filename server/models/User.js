const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
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
  plan_id: {
      type: Integer,
      required: true,
  },
    //set planid to be an array of exercises
    savedPlan: [exercises],
  },
  // do we need to set virts?
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

//when user is queried their exercises based on their planid comes with it 
// userSchema.virtual('exercises').get(function () {
//   return this.savedBooks.length;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
