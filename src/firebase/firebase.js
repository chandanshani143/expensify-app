import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();     
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// //child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// //child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// //child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// database.ref('expenses')
// .on('value', (snapshot) => {
//   const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// database.ref('expenses').push({                 //push will add new property with unique id with object
//   description: 'Buy goods',
//   note: 'abc',
//   amount: 120,
//   createdAt: '12 jan 2020'
// });

// database.ref().on('value', (snapshot) => {                    //by using on() we can get the data initially and also after the data changes
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
// }, (e) => {
//     console.log('Error with data fecthing', e);
// });


// database.ref('location/city')
// .once('value')
// .then((snapshot) => {
//    const val = snapshot.val();                 //val return the data we requesting
//     console.log(val);
// }).catch((e) => {
//     console.log("Error fetching data",e);
// })

// database.ref().set({
//     name: 'chandan shani',
//     age: 21,
//     job: {
//         title: 'web developer',
//         company: 'Google'
//     },
//     stressLevel: 6,
//     location: {
//         city: 'Dhulabari',
//         dist: 'jhapa'
//     }
// }).then(() => {
//     console.log('Data is saved')
// }).catch((e) => {
//     console.log('This failed', e)
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Banglore'
// });

// database.ref().remove()
//   .then(() => {
//       console.log("Removed successfully")
//   }).catch((e) => {
//     console.log('failed to remove', e)
//   });