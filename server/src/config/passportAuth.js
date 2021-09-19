const passport = require('passport');
const localStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const { User } = require('../models/User');
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = localStrategy.Strategy;

passport.use(
  'isAuth',
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.user.id);

        if (!user) {
          return done(null, false, {
            message: 'Invalid token',
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  'isAdmin',
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.user.id);

        if (!user) {
          return done(null, false, {
            message: 'Invalid token',
          });
        }

        if (!user.admin) {
          return done(null, false, {
            message: 'Invalid token',
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = req.body;
        const existingUser = await User.findOne({
          $or: [
            {
              email: data.email,
            },
            { idNumber: data.idNumber },
          ],
        });

        if (existingUser) {
          if (existingUser.email === data.email) {
            return done(null, false, { message: `Email ${data.email} ya existe` });
          }

          if (existingUser.idNumber === data.idNumber) {
            return done(null, false, { message: `Cedula ${data.idNumber} ya existe` });
          }
        }

        const newUser = await User.create(data);
        done(null, newUser);
      } catch (error) {
        done(err, false);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: `Datos invalidos` });
        }

        const validatePassword = await user.isValidPassword(password);
        if (!validatePassword) {
          return done(null, false, { message: `Datos invalidos` });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
