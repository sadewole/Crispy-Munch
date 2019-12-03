import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import db from './model/index';
import Helper from './middleware/Helper';

const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

// JWT Strategy
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const text = `select * from users where id = $1`;

        const user = await db.query(text, [payload.sub]);

        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// LOCAL strategy
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        // find user
        const { rows } = await Helper.exitEmail(email);
        const user = rows[0];

        if (!user) return done(null, false);

        // check if the passsword is correct
        const compare = await Helper.comparePassword(user.password, password);

        if (!compare) return done(null, false);

        // validate user
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
