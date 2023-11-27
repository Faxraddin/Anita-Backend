const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const UserRouter = require("./routes/user.js");

const app = express();
dotenv.config();
app.use(cors({origin:true,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.set("strictQuery", false);

app.use("/", UserRouter);

const DB = process.env.DB;
// 'mongodb+srv://Soniza:Soniza@sonia.ufjqbim.mongodb.net/Soniza';
const PORT = 8080;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(()=>console.log("MongoDB Connection Succeeded."))
.catch((err) => console.log("Error in DB connection: " + err));

app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))