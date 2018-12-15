const logger = require('debug')('app:async');
let promiseDemo = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    } , 1000);
});
let promiseDemo2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    } , 1000);
});
let promiseDemo3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    } , 1000);
});
Promise
    .all([promiseDemo, promiseDemo2, promiseDemo3])
    .then(response => logger(response))
    .catch(err => logger(err));


// async function  asyncDemo() {
//     await a = 10;
// }

