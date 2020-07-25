//-------------------------OBJECT DESTRUCTURING-----------------------

// const person = {
//     name: 'chandan',
//     age: 21,
//     location: {
//         city: 'Dhulubari',
//         temp: 26
//     }
// };
 
// const {name: firstname, age} = person
// console.log(`${firstname} is ${age} years old.`);

// const {city, temp: temperature} = person.location
// if(city && temperature) {
//     console.log(`It is ${temperature} in ${city}.`);
// }

// const book = {
//     title: 'EGo is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         // name: 'penguin'
//     }
// };

// const {name: publisherName = 'self-published'} = book.publisher
// console.log(publisherName);

//-------------------------ARRAY DESTRUCTURING-------------------------

const address = ['Dhulabari', 'jhapa', 'Nepal'];

const [city, district, country] = address;

console.log(`you are in ${city}, ${district}, ${country}`);


const item = ['coffee (hot)', '$2.4', '$3.0', '$2.1']

const [coffee, small, medium, large] = item

console.log(`A medium ${coffee} costs ${medium}.`)