const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error while connection to Database'));

db.once('open',function(){
    console.log('Succesfully Connected to Database');
});