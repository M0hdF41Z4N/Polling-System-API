// Importing Express
const express = require('express');
const app = express();

// Setting up routes
app.use('/',require('./routes'));



// Configuring to db
const db = require('./config/mongoose');

app.listen(8000,function(err){
    if (err) {
        // For debuging purpose
        // console.log("Error in starting server",err);
        return;
    }
    // For debuging purpose
    // console.log("Server running on port : 8000");
})