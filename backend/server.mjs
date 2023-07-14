import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import UsersModel from './models/Users.js';


const app = express();
app.use(cors());
app.use(express.json());

// how to find thi connectin is working or not
mongoose.connect("mongodb+srv://tharinduherath:yF8kg4vXT9OidMqU@cluster1.lwwahgu.mongodb.net/Users?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });


app.post('/signup', async (req, res) => {
    console.log(req.body);
   UsersModel.create(req.body)
   .then(data => res.json(data))
   .catch(err => res.json(err));
   
  });

app.post('/login', async (req, res) => {
  console.log(req.body);
  const {email,password} = req.body;  
  UsersModel.findOne({email:email})
  .then(user => {
    if(user){
    if (user.password === password) {
      res.json("Success");
    }
    else{
      res.json("Wrong password");
    } }
    else{
      res.json("User not found");
    }
  })
  
});

  

app.listen(8081, () => {
 console.log('Server is running on port 8081');
})