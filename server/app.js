/**
 * Created by kellygarskemoore on 11/6/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/messages_db';

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// Add a new person
app.post('/data', function(req,res){
    // pull the data off of the request
    var addedMessage = {
        "name" : req.body.getName,
        "message" : req.body.getMsg
    };

    pg.connect(connectionString, function (err, client) {
        //SQL Query > Insert Data
        //Uses prepared statements, the $1 and $2 are placeholder variables. PSQL then makes sure they are relatively safe values
        //and then uses them when it executes the query.
        client.query("INSERT INTO messageboard (name, message) VALUES ($1, $2) RETURNING id", [addedMessage.name, addedMessage.message],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });

    });

});

// Get all the people information
app.get('/data', function(req,res){
    var theseMsgs = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT id, name, message FROM messageboard ORDER BY name ASC");

        // Stream results back one row at a time, push into theseMsgs array
        query.on('row', function (row) {
            theseMsgs.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(theseMsgs);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});



app.get("/*", function(req, res){
    var file = req.params[0] || "/views/index.html"
    res.sendFile(path.join(__dirname, "./public", file))
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});