const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparedPassword } = require('../utils/helpers');
const UserModel = require('../models/schemas/users');
const { connect } = require('mongoose');

//Serialize user -modify the session object by adding an object(passport) (taking dbUser object when succesfully logs in from local startegy)
passport.serializeUser((user, done)=>{
    console.log("serilizing user...")
    // add an object(passport) to the Session.Object contains User's username,password and authenticated=true.
    done(null,  {username:user.email,
        userId:user.id,
        // authenticated:true
     });
   
});

//deserialize user by taking the object Passport.user object from the session
//the paramater user is the object passport.user picked from the session
passport.deserializeUser(async (user, done)=>{ 
    console.log("Deserializing user...")
    const id = user.userId;
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
        passwordField: 'password'
    },
    async (email, password, done)=>{
        // returns bad request if there is no username of password field in te body{validate this in front end before sending to backend}
        // if (!email || !password) throw new Error('Missing credentials:email and pasword required');
        // if (!email || !password) return res.status(401).json({"error":'Missing credentials:email and pasword required'});
        try {        
        const dbUser = await UserModel.findOne({ email:email });
        // if(!dbUser) throw new Error('Use not found'); 
        if (!dbUser) return done(null, false); //returns unauthorized {need to have a cusomized error when user is not found}
        const isValid = comparedPassword(password, dbUser.password ); //returns true if password matches and false if they dont match
        if (isValid) {
            console.log("user authenticated");
            return done(null,dbUser); //returns the dbuser user object then serializes the user i.e modify the cookie by adding passport object
          } else {
            console.log("authentication Failed");
            return done(null,false); //returns unauthorized {need to customize the error}
        }
        } catch (err) {
            console.log(err);
            done(err,null);
        }
    }
))


