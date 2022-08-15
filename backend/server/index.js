// server/index.js

const express = require("express");
const request = require('request');
const PORT = process.env.PORT || 3001;
const app = express();

function APIcall(url) {
    return new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
            if (err) reject(err)
            resolve(body)
        });
    })
}

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/getAPIResponse', (req, res) => {
    APIcall('https://api.coinlore.net/api/tickers/')
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})
/*
app.get("/pricetest", (req, res) => {
    request('https://api.coinlore.net/api/tickers/', function (error, response) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
    })
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})
*/

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});