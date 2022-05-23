const express = require('express');
const app = express();
const port = 5000;
const config = require('./server/config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('MONGODB CONNECTED!!'))
  .catch(err => console.log(err))


app.use('/api/users',require('./server/routes/users'));
app.use('/api/products',require('./server/routes/products'));
app.use('/api/videos',require('./server/routes/video'));
app.use('/api/subscribe',require('./server/routes/subscribe'));
app.use('/api/like',require('./server/routes/like'));
app.use('/api/comment',require('./server/routes/comment'));
app.use('/api/score',require('./server/routes/score'));

app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})