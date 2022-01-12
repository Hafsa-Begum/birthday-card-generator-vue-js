//imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5005;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
})
    .then(() => console.log("connected to the mongodb database"))
    .catch((err) => console.log(err));

//api calling
app.use('/api/cards', require('./routes/routes'))

//start server
app.listen(port, () => console.log(`server running at http://localhost: ${port}`))