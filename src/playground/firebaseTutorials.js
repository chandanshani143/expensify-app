import * as firebase from 'firebase';
import { connect } from 'react-redux';

const firebaseConfig = {
    apiKey: "AIzaSyBZlTRBURR7txtd9vGrzNs7ukk2fJJYInc",
    authDomain: "expensify-bbe35.firebaseapp.com",
    databaseURL: "https://expensify-bbe35.firebaseio.com",
    projectId: "expensify-bbe35",
    storageBucket: "expensify-bbe35.appspot.com",
    messagingSenderId: "987240401470",
    appId: "1:987240401470:web:e0b4d14532ce048ca9df6f",
    measurementId: "G-1W5ZKJBFPB"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

database.ref().set({
    name: 'chandan shani',
    age: 21,
    isSingle: true,
    location: {
        city: 'Dhulabari',
        dist: 'jhapa'
    }
}).then(() => {
    console.log('Data is saved')
}).catch((e) => {
    console.log('This failed', e)
});

// database.ref().set('this is my data');

// database.ref('age').set(27);                                //ref gives reference to specific piece of data, if we don't put reference then it will overide the whole data in the database
// database.ref('location/city').set('New york');              //updating city in location

database.ref('attributes').set({               //setting new attribues with object
    height: '6ft inch',
    weigth: 500
}).then(() => {
    console.log('second set call worked');
}).catch((e) => {
    console.log('Things didn\'t went well!',e);
});


//---------------------------------------------removing data from database---------------

database.ref('isSingle').set(null);             //alternative way to remove a data

// database.ref().remove()
//   .then(() => {
//       console.log("Removed successfully")
//   }).catch((e) => {
//     console.log('failed to remove', e)
//   });

//------------------------------update---------------------------------
database.ref().update({
    name: 'max',
    age: '23',
    job: 'web developer',                      //adding new property
    isSingle: null                            //deleting the isSingle property
});

database.ref().update({
    stressLevel: 9,
    'job/company': 'Amazon',                   //for nested changes to objects we have to put them in quotes
    'location/city': 'Banglore'
});

//---------------------------------fetching data-------------------------------
database.ref()                                   //value is the event name
.once('value')                                  //once allows you to fetch data only once on a particular reference, it will not fetch the data after the data changes
.then((snapshot) => {
   const val = snapshot.val();                 //val return the data we requesting
    console.log(val);
}).catch((e) => {
    console.log("Error fetching data",e);
});

database.ref().on('value', (snapshot) => {                    //by using on() we can get the data initially and also after the data changes
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
}, (e) => {
    console.log('Error with data fecthing', e);
});

database.ref().on('value', (snapshot) => {                    //by using on() we can get the data initially and also after the data changes
    console.log(snapshot.val());
});

setTimeout(() => {
    database.ref('age').set(28);
},3500);

setTimeout(() => {
    database.ref().off();                   //off() will cancel all the subscription on that reference but it will indead change data on the database 
},7000);

setTimeout(() => {
    database.ref('age').set(29);
},10500);

//we can also choose a particular function to unsubscribe
database.ref().on('value', (snapshot) => {                    //by using on() we can get the data initially and also after the data changes
    console.log(snapshot.val());
}, (e) => {
    console.log('Error with data fecthing', e);
});

setTimeout(() => {
    database.ref().off('value',onValueChange);                   //here we can unsubscribe a particular function
},7000);

//----------------------------firebase doesn't support array------------
// const firebaseNotes = {

// }
// const notes = [{
//     id: '12',
//     title: 'first note',
//     body: 'this is first body'
// }, {
//     id: '13',
//     title: 'second note',
//     body: 'this is second body'
// }];

// database.ref().set(notes);

//-------------------------adding array data to firebase----------------

database.ref('expenses').push({               //push will add new property with unique id with object
    description: 'Buy goods',
    note: 'abc',
    amount: 120,
    createdAt: '12 jan 2020'
  });

  //child_removed
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
  });
  
  //child_changed
  database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
  });
  
  //child_added
  database.ref('expenses').on('child_added', (snapshot) => {           //child_added event will fire for all the data that already exist in the database as well as for the data being added
    console.log(snapshot.key, snapshot.val());
  });
  
database.ref('expenses')
.once('value')
.then((snapshot) => {
const expenses = [];

snapshot.forEach((childSnapshot) => {
    expenses.push({
    id: childSnapshot.key,
    ...childSnapshot.val()
    });
});
console.log(expenses);
});

database.ref('expenses')
.on('value', (snapshot) => {
const expenses = [];

snapshot.forEach((childSnapshot) => {
    expenses.push({
    id: childSnapshot.key,
    ...childSnapshot.val()
    });
});
console.log(expenses);
});

database.ref('expenses').push({                 //push will add new property with unique id with object
description: 'Buy goods',
note: 'abc',
amount: 120,
createdAt: '12 jan 2020'
});