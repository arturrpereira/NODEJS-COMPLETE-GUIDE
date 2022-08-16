const express = require('express');

const app = express();

// app.use((req, res, next) => {
   // console.log('This is middleware 1');
   // next();
// })

// app.use((req, res, next) => {
   // console.log('This is middleware 2');
   // res.send('<h1>You are in middleware </h1>')
// })

app.use('/users', (req, res, next) => {
   console.log('/users middleware');
   res.send('<p>The Middleware that handles just /users</p>');
});

app.use('/', (req, res, next) => {
   console.log('/ middleware');
   res.send('<p>The Middleware that handles just /</p>');
});

app.listen(3000);
