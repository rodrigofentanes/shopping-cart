console.log(' ------ Import module test ------ ');

import { hello } from './module.js';

console.log(' :: student :: ' + hello());

console.log(' ------ Import JSON test ------ ');

import result from '../data/students.json' with { type: "json" };

// var jsonString = JSON.stringify(result);
// var jsonObject = JSON.parse(jsonString)
// var jsonMap = new Map();
// for (const key in jsonObject) {
//   jsonMap.set(key, jsonObject[key]);
// }

// OR

// var jsonMap = new Map();
// for (const key in result) {
//   jsonMap.set(key, result[key]);
// }

// OR

var jsonMap = new Map(Object.entries(result));

console.log('jsonMap');
console.log(jsonMap);