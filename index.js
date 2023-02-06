const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const gamePublication = require('./routes/games')
require("dotenv").config();

app.use(cors());
app.use(express.json());







mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_LOCAL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(() => console.log("DB ONLINE"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || "9001", () => {  
  console.log("Servidor corriendo en puerto", process.env.PORT);
});
