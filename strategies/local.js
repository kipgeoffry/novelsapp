const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparedPassword } = require('../utils/helpers');
const UserModel = require('../models/schemas/users');
const { connect } = require('mongoose');

//Serialize user
passport.serializeUser((user, done)=>{
    console.log("serilizing user...")
    done(null, user.id);
});

//deserialize user by taking the id from req.session.passport
passport.deserializeUser(async (id, done)=>{
    console.log("deserializing user...")
    try {
        const user = await UserModel.findById(id);
        if (!user) throw new Error('User not found.');
        done(null,{
            id:user.id,
            email:user.email
        }); //pass the user id and email to the req.user object when deserializing
    } catch (error) {
        console.log(error);
        done(error,false)
    }
  });

  //configure Local strategy
passport.use( new LocalStrategy(
    {
        usernameField: 'email',
    },
    async (email, password, done)=>{
        if (!email || !password) throw new Error('Missing credentials:email and pasword required');
        try {        
        const dbUser = await UserModel.findOne({ email:email });
        // if(!dbUser) throw new Error('Use not found'); 
        if (!dbUser) return done(null, false);
        const isValid = comparedPassword(password, dbUser.password );
        if (isValid) {
            console.log("user authenticated");
            return done(null,dbUser);
          } else {
            console.log("authentication Failed");
            // throw new Error('authentication failed.');
             return done(null,false);
        }
        } catch (err) {
            console.log(err);
            done(err,null);
        }
    }
))


