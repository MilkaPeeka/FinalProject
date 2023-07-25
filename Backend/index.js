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

const app = express();

app.use(bp.urlencoded({extended: true}));

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

app.get('/api/rakams/get_by_gdud_and_makat/:gdud/:makat', async (req, res) => {
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

app.get('/api/rakams/get_by_gdud/:gdud', async (req, res) => {
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


app.get('/api/users/get_by_pernum/:pernum', async (req,res) => {
  const pernum = req.params.pernum;

  try {
    const queryResult = await User.find({pernum: pernum});
    res.json({error: false,  results: queryResult});
  }

  catch (error) {
    res.json({error: true, error_msg: error.message});
  }

});


app.post('/api/rakams/add/', async (req, res) => {
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