const { response } = require("express");
const { findById } = require("../models/Game");
const Game = require("../models/Game");
var XMLHttpRequest = require('xhr2');


function getSteamGameDetails(req, res) {

    var xhttp = new XMLHttpRequest();

    const { appids } = req.query;

    xhttp.onreadystatechange = function logger() {

        if (this.readyState === 4 && this.status === 200) {
            const obj = JSON.parse(this.responseText);
            const key = appids
            const { [key]: y } = obj
            res.json({
                resp: y.data,
            })
        }
    };
    xhttp.open('GET', `https://store.steampowered.com/api/appdetails?appids=${appids}`, true);

    xhttp.send();
}

module.exports = {
    getSteamGameDetails,
}