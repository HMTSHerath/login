import express from 'express';
import { createConnection, createPool } from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());

const db = createPool({
    host: 'localhost',
    user: 'sqluser',
    password: 'sqluserpass',
    database: 'signup'
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
}} )

const upload = multer({
    storage:storage
})

// db.query("SELECT * FROM login", (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

app.post('/upload',upload.single('image') ,(req, res) => {
    console.log(req.file);
    const image = req.file.filename;
    console.log(image);
    const sql = "INSERT INTO ``(`image`) VALUES (?)";
    db.query(sql, [values], (err, data) => {
        if (err) {
          return res.json("error");
        }
        return res.json(data);
      });
});



app.post('/signup', (req, res) => {
    console.log(req.body);
    const { name, email, password,phone } = req.body; 
    const sql = "INSERT INTO `login`( `name`, `email`, `password`, `phone`,`image`) VALUES (?)";
    const values = [name, email, password, phone ,image];
    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("error");
      }
      return res.json(data);
    });
  });


  app.post('/login', (req, res) => {
    console.log(req.body);
     
    const sql = "SELECT * FROM `login` WHERE `email` = ? AND `password` = ?";
    
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
      if (err) {
        return res.json("error");
      }
      if(data.length > 0){
        return res.json("Success");
    } else { 
        return res.json("Failed");}
    }
    );
  });
  

app.listen(8081, () => {
 console.log('Server is running on port 8081');
})