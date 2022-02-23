const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/User');


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
    {
        secretOrKey: process.env.TOKEN_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      console.log('gggg');
        try {

            return done(null, token.user);
        } catch (error) {
            console.log('errr');
            done(error);
        }
    }
    )
);

    
passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );


  
passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {

        try {
          const user = await User.findOne({ email : email });
          if (!user) {
            console.log('user not found');
            return done(null, null, { status : false, msg: 'User not found' });
          }
          
          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, null, { status : false, msg: 'Wrong password!' });
          }
          return done(null, user, { status : true, msg: 'Logged in Successfully' });
        } catch (error) {
          return done(new Error('Something went wrong'), null, { status: false.valueOf, msg: 'Somthing went wrong' });
        }
      }
    )
  );