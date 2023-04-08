const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./user');

//Form field to DB field map
const localOpt = {
  usernameField: 'email',
  passwordField: 'password'
};

const strategy = new LocalStrategy(localOpt, async (email,
  password, done) => {
  try {
    const userChosen = await UserModel.findOne({ email: email });
    if (!userChosen) {
      // Exit if no matching user
      return done(null, false, { message: 'Email not found' });
    }
    // check password
    const validate = await userChosen.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    // If we are here, then the user exists and the password hashes match, continue
    return done(null, userChosen, { message: 'Logged in Successfully' });
  }
  catch (error) {
    return done(error);
  }
});
// attach our strategy to the localLogin resource in Passport
passport.use('localLogin', strategy);

// Serialize the user to attach them to the session
passport.serializeUser((user, done) => done(null, user.email));

// Deserializeation method, this can be used to attach the user data to the req object
passport.deserializeUser(async (email, done) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      done("", user)
    }
  } catch (err) {
    done(err, false)
  }
}); 
