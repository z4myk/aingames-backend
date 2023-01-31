const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
app.use(express.json());



app.listen(port || "9001", () => {
    console.log('Servidor corriendo en puerto', port)
})