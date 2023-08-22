const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparedPassword } = require('../utils/helpers');
const UserModel = require('../../models/schemas/users');
const { connect } = require('mongoose');
const { USE_PROXY } = require('http-status');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

//Serialize user -modify the session object by adding an object(passport) (taking use object when succesfully logs in from local startegy)
passport.serializeUser((user, done)=>{
    console.log("Serilizing user...")
    //adds user object to the request object i.e req.user
    // add an object(passport) to the Session Object contains User's username,id and authenticated=true flag.
    done(null,  {
        username:user.email,
        userId:user.id,
        authenticated:true
     });
   
});

//deserialize user by taking the object Passport.user object from the session
//the paramater user is the object passport.user picked from the req.session object
passport.deserializeUser(async (user, done)=>{ 
    console.log("Deserializing user...")
    const id = user.userId;
    try {
        const user = await UserModel.findById(id);
        // if (!user) throw new Error('User not found.');
        if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        done(null,{
            id:user.id,
            email:user.email
        }); //pass the user id and email to the req.user object when deserializing
    } catch (error) {
        console.log(error);
        done(error)
    }
  });

  //configure Local strategy
passport.use( new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done)=>{
        // returns bad request if there is no username or password field in the body{validate this in front end before sending to backend}
        // if (!email || !password) throw new Error('Missing credentials:email and pasword required');
        // if (!email || !password) return res.status(401).json({"error":'Missing credentials:email and pasword required'});
        try {        
        const dbUser = await UserModel.findOne({ email:email });
        if(!dbUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        // if(!dbUser) console.log(`user with ${email} not found`) 
        // if (!dbUser) return done(null, false, { message:"user not found" }); //returns unauthorized {need to have a cutsomized error when user is not found}
        const isValid = comparedPassword(password, dbUser.password ); //returns true if password matches and false if they dont match
        if (isValid) {
            console.log("++++++user authenticated by Passport+++++++");
            const user = {
                id:dbUser.id,
                email:dbUser.email,
                name:dbUser.fullName
            }
            return done(null,user); //returns the dbuser user object then serializes starts(passes to the serilization module) 
          } else {
            console.log("Authentication Failed,Incorrect password");
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Login Failed!,Invalid password');
            // return done(null,false, { message: "Login Failed!,Invalid password" }); //returns unauthorized {need to customize the error}
        }
        } catch (err) {
            console.log(err);
            done(err);
        }
    }
))


