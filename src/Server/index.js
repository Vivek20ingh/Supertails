const express=require('express');
const app=express();

const dotenv= require('dotenv');
const mongoose= require('mongoose');

// Import Routes
const register= require('./Authentication/register');
const login = require('./Authentication/login');



dotenv.config();


// connect to DB

mongoose.connect(process.env.DB_CONNECT,{ keepAlive:true,useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 8000})
.then(x=> console.log('connected'))
.catch(err => console.log('not connected to db'));

// middleware

app.use(express.json());

// Route Midleware
app.use('/api/register', register);
app.use('/api/login', login);

app.listen(9000,() => console.log('Server running on Port 9000'));