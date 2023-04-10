const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const mongoKey = config.mongoKey;

const MONGODB_URI = mongoKey;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'publics')));
app.use(session({ secret: 'my secret', resave: false, saveUnintialized: false, store: store }));

app.use((req, res, next) => {
  User.findById('6419e8c5ca3ef31a58d63855')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Artur',
          email: 'artur@teste.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  }).catch(err => {
    console.log(err);
  });
