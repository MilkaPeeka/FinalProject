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
const cors = require('cors');
const app = express();
const store = MongoDBStore({
  uri: process.env.REMOTE_DB,
  collection: 'BarakSessions', // Collection name for storing sessions in MongoDB
});

app.use(bp.urlencoded({extended: true}));
app.use(bp.json({extended: true}));
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 86400000}, // 1 day in milliseconds
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
    return res.json({ error: true, error_message: 'משתמש לא מאומת' });
  }
};

app.post('/api/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: true, error_message: 'Internal server error ' + err.message });
    }
    if (!user) {
      return res.json({ error: true, error_message: 'משתמש הכניס מזהה לא נכון' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error_message: 'Login failed' });
      }

      return res.status(200).json({ error: false, message: 'Login successful', user, sessionExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)});
    });
})(req, res);
});

app.get('/api/isLoggedIn', (req, res) => {
  if (req.isAuthenticated()){
    res.json({error: false, user: req.user});
  }
  else {
    res.json({error: false, user: null})
  }
});
app.get('/api/logout', (req, res) => {
  // Call req.logout() to log out the current user
  req.logout((err) => {
    if (err) {
      return res.json({ error: true, error_message: "Logout failed " + err.message });
    }

    // Destroy the session on the server-side
    req.session.destroy((err) => {
      if (err) {
        return res.json({ error: true, error_message: "Logout failed " + err.message });
      }

      // Clear the session cookie on the client-side
      res.clearCookie('connect.sid');

      return res.json({ error: false, result: "Logout success!" });
    });
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

// app.get('/api/rakams/get_by_gdud_and_makat/:gdud/:makat',authenticateMiddleware, async (req, res) => {
//   const makat = req.params.makat;
//   const gdud = req.params.gdud;
//   try {
//     const queryResult = await carData.find({
//       makat: makat,
//       gdud: gdud
//     });

//     res.json({error: false,  results: queryResult});
//   }

//   catch (error) {
//     res.json({error: true, error_msg: error.message});
//   }

// });

app.get('/api/rekems/get_by_gdud/',authenticateMiddleware, async (req, res) => {
  try {
    const queryResult = await carData.find({
      gdud: req.user.gdud
    });

    res.json({error: false, results: queryResult});
  }

  catch (error) {
    res.json({error: true, error_msg: error.message});
  }

});


// app.get('/api/users/get_by_pernum/:pernum',authenticateMiddleware, async (req,res) => {
//   const pernum = req.params.pernum;

//   try {
//     const queryResult = await User.find({pernum: pernum});
//     res.json({error: false,  results: queryResult});
//   }

//   catch (error) {
//     res.json({error: true, error_msg: error.message});
//   }

// });


app.post('/api/rekems/add/',authenticateMiddleware, async (req, res) => {
  if (!req.user.isManager){
    res.json({error: true, error_message: 'Unauthorized to add new rakams'});
    return;
  }
  const { carNumber, makat, kshirot} = req.body;
  console.log(req.body)
  if (!carNumber || !makat || kshirot === undefined) 
    res.json({error: true, error_message: 'One or more fields are invalid'});

  else {
    const newlyAdded = new carData({
        carNumber,
        makat,
        kshirot,
        gdud: req.user.gdud,
      });

      newlyAdded.save()
      .then(() => res.json({error: false, result: newlyAdded}))
      .catch((err) => res.json({error: true, error_message: err.message}));
    }


});

mongoose.connect(process.env.REMOTE_DB)
.then(async () => {
  console.log('connected to db successfully');
  const users = await User.find({});
  const carDatas = await carData.find({});
  const port = 3001;
  app.listen(port, () => console.log(`running api on port ${port}`));
})
.catch((err) => {
  console.error(err.message);
});