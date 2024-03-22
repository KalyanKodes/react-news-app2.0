const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const LoginModel = require('./models/Login');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/news-app').then(()=>console.log("Connected To Database"))


app.get("/login", async (req, res) => {
    try {
        const users = await LoginModel.find();
        
        if (!users || users.length === 0) {
            return res.send([]);
        }
        return res.json(users);
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});



app.listen(3001, () => console.log("Server running at 3001"));
