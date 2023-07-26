/*
TODO: 
1. add 500 error on server error
2. add 400 error on empty query (?)
3. refactoring, obviously
4. authentication user Bearer
5. learn more about mongo caching
6. adding indexes?
7. params vs query (i.e: rakams/get_by_gdud/80 OR rakams/get_by_gdud?gdud=80)
*/


require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bp = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const store = MongoDBStore({
  uri: "mongodb+srv://Yuval:" +process.env.DB_PASSWORD +"@cluster0.dcwwtsq.mongodb.net/ProjectDummyData",
  collection: 'BarakSessions', // Collection name for storing sessions in MongoDB
  expires: 1000 * 60 * 60 * 24, // Session expiration time (in milliseconds) - 1 day in this example
});
app.use(bp.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(passport.initialize());
app.use(passport.session());

const User = mongoose.model('User', mongoose.Schema({
  pernum: {type: String, unique: true},
  gdud: String,
  isManager: Boolean
}));

const carData = mongoose.model('carData', {
  carNumber: {type: String, unique: true},
  makat: String,
  kshirot: Boolean,
  gdud: String
}, 'carDatas');



passport.use('local',new LocalStrategy({usernameField: 'pernum', passwordField: 'pernum'},
    (pernum, password, done) => {
      User.findOne({ pernum })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.log(err);
        return done(err, null);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  console.log('serializing user: ', user);
  cb(null, {id: user.id, isManager: user.isManager});
});

passport.deserializeUser((user, done) => {
  console.log('deserializing user: ', user.id);
  User.findById(user.id)
  .then(user => {
    done(null, user);
  })
  .catch(err => {
    console.log(err);
    return done(err, null);
  });
});

const authenticateMiddleware = (req, res, next) => {
  // Use passport's built-in isAuthenticated method to check if the user is authenticated
  if (req.isAuthenticated()) {
    // If the user is authenticated, continue to the next middleware or route handler
    return next();
  } else {
    return res.status(401).json({ error: true, error_message: 'Unauthenticated' });
  }
};

app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: true, error_message: 'Internal server error ' + err.message });
    }
    if (!user) {
      return res.status(401).json({ error: true, error_message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error_message: 'Login failed' });
      }
      return res.status(200).json({ error: false, message: 'Login successful', user });
    });
})(req, res);
});

app.get('/isLoggedIn', (req, res, next) => {
  if (req.isAuthenticated()){
    res.json({error: false, auth: true});
  }
  else {
    res.json({error: true, error_meesage: 'UnAuthenticated'})
  }
});
app.get('/logout', (req, res) => {
  // Call req.logout() to log out the current user
  req.logout((err) => {
    if (err){
      return res.json({error: true, error_message: "Logout failed " + err.message})
    }

    return res.json({error: false, result: "log out success!"})
  });

});

// const main = async () => {
//     try {
//       const users = await User.find({});
//       console.log(users);
  
//       const carDatas = await carData.find({});
//       console.log(carDatas);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   main().then(() => {
//     mongoose.connection.close();
//   });

app.get('/api/rakams/get_by_gdud_and_makat/:gdud/:makat',authenticateMiddleware, async (req, res) => {
  const makat = req.params.makat;
  const gdud = req.params.gdud;

  try {
    const queryResult = await carData.find({
      makat: makat,
      gdud: gdud
    });

    res.json({error: false,  results: queryResult});
  }

  catch (error) {
    res.json({error: true, error_msg: error.message});
  }

});

app.get('/api/rakams/get_by_gdud/:gdud',authenticateMiddleware, async (req, res) => {
  const gdud = req.params.gdud;

  try {
    const queryResult = await carData.find({
      gdud: gdud
    });

    res.json({error: false, results: queryResult});
  }

  catch (error) {
    res.json({error: true, error_msg: error.message});
  }

});


app.get('/api/users/get_by_pernum/:pernum',authenticateMiddleware, async (req,res) => {
  const pernum = req.params.pernum;

  try {
    const queryResult = await User.find({pernum: pernum});
    res.json({error: false,  results: queryResult});
  }

  catch (error) {
    res.json({error: true, error_msg: error.message});
  }

});


app.post('/api/rakams/add/',authenticateMiddleware, async (req, res) => {
  if (!req.user.isManager)
    res.json({error: true, error_message: 'Unauthorized to add new rakams'});
  const { carNumber, makat, kshirot, gdud } = req.body;

  if (!carNumber || !makat || kshirot === undefined || !gdud) 
    res.json({error: true, error_message: 'One or more fields are invalid'});

  else {
    const newlyAdded = new carData({
        carNumber,
        makat,
        kshirot,
        gdud,
      });

      newlyAdded.save()
      .then(() => res.json({error: false, result: newlyAdded}))
      .catch((err) => res.json({error: true, error_message: err.message}));
    }


});

mongoose.connect("mongodb+srv://Yuval:" +process.env.DB_PASSWORD +"@cluster0.dcwwtsq.mongodb.net/ProjectDummyData")
.then(async () => {
  console.log('connected to db successfully');
  const users = await User.find({});
  const carDatas = await carData.find({});
  
  if (users.length === 0){
    // we will generate 3 users
    new User({
      pernum: 9901,
      gdud: 19,
      isManager: false
    }).save();
  
    new User({
      pernum: 2162,
      gdud: 19,
      isManager: true
    }).save();
  
    new User({
      pernum: 6517,
      gdud: 20,
      isManager: true
    }).save();
  }
  
  if (carDatas.length === 0){
    new carData({
      carNumber: 1992313,
      makat: 80,
      kshirot: true,
      gdud: 19
    }).save();
  
    new carData({
      carNumber: 3243,
      makat: 801,
      kshirot: false,
      gdud: 19
    }).save();
  
    new carData({
      carNumber: 1777313,
      makat: 80,
      kshirot: true,
      gdud: 19
    }).save();
  
    new carData({
      carNumber: 1232,
      makat: 801,
      kshirot: false,
      gdud: 20
    }).save();
  
    new carData({
      carNumber: 100013,
      makat: 12,
      kshirot: true,
      gdud: 20
    }).save();
  }

  app.listen(3000, () => console.log('running api on port 3000'));
})
.catch((err) => {
  console.error(err.message);
})