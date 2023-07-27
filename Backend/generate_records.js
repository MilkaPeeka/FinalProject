require('dotenv').config();

const mongoose = require('mongoose');
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
  

 const generate_gduds = (amount = 10) => {
    const gdudsList = [];
    const minNumber = 80;
    const maxNumber = 300;
  
    for (let i = 0; i < amount; i++) {
      const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      gdudsList.push(randomNum);
    }
  
    return gdudsList;
  };


  const generate_pernum = (amount = 10) => {
    const pernumsList = [];
    const minNumber = 1000; // Smallest 8-digit number (10^7)
    const maxNumber = 9999; // Largest 8-digit number (10^8 - 1)
  
    for (let i = 0; i < amount; i++) {
      const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      pernumsList.push(randomNum);
    }
  
    return pernumsList;
  };


const generateUsers = (pernumsList, gdudList) => {
  const users = [];

  // Shuffle the gduds array to ensure each gdud has at least one manager
  const shuffledGduds = gdudList.slice(); // Create a copy of the gduds array
  for (let i = shuffledGduds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledGduds[i], shuffledGduds[j]] = [shuffledGduds[j], shuffledGduds[i]];
  }

  // Create user objects
  for (let i = 0; i < pernumsList.length; i++) {
    const pernum = pernumsList[i];
    const gdud = shuffledGduds[i % shuffledGduds.length];
    const isManager = i < shuffledGduds.length; // First users will be managers

    const user = new User({
      pernum,
      gdud,
      isManager,
    });

    users.push(user);
  }

  return users;
};

const generate_rakam_makat = (amount = 10) => {
    const makatsList = [];
    const minMakat = 1000000; // Smallest 7-digit number (10^6)
    const maxMakat = 9999999; // Largest 7-digit number (10^7 - 1)
  
    for (let i = 0; i < amount; i++) {
      const randomMakat = Math.floor(Math.random() * (maxMakat - minMakat + 1)) + minMakat;
      makatsList.push(randomMakat);
    }
  
    return makatsList;
  };

  const generate_rakam = (gdudList, rakam_makatList, amount = 10) => {
    const rakamList = [];
    const usedCarNumbers = new Set();
  
    for (let i = 0; i < amount; i++) {
      const makat = rakam_makatList[Math.floor(Math.random() * rakam_makatList.length)];
      const carNumber = generateUniqueCarNumber(usedCarNumbers);
      const kshirot = Math.random() < 0.5; // Random boolean value (true or false)
      const gdud = gdudList[Math.floor(Math.random() * gdudList.length)];
  
      const rakam = new carData({
        makat,
        carNumber,
        kshirot,
        gdud,
      });
  
      rakamList.push(rakam);
    }
  
    return rakamList;
  };
  
  // Helper function to generate unique car numbers (9 digits)
  const generateUniqueCarNumber = (usedCarNumbers) => {
    let carNumber;
    do {
      carNumber = Math.floor(100000000 + Math.random() * 900000000); // Generate a 9-digit number
    } while (usedCarNumbers.has(carNumber));
  
    usedCarNumbers.add(carNumber);
    return carNumber;
  };

 


mongoose.connect(process.env.REMOTE_DB)
.then(() =>{
    const AMOUNT = 30;
    const gdudList = generate_gduds(AMOUNT / 2);
    const pernumList = generate_pernum(AMOUNT / 5);
    const userList = generateUsers(pernumList, gdudList);
    
    const rakam_makatList = generate_rakam_makat(AMOUNT);
    const rakamList = generate_rakam(gdudList, rakam_makatList, 5000);
    
    console.log("User List:");
    console.log(userList.forEach(user => user.save()));
    console.log("\nRakam List:");
    console.log(rakamList.forEach(rakam => rakam.save()));
})
.catch(err => console.log(err));