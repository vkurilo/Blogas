import express, { json } from "express";
import cors from "cors";
import * as fs from "fs";
import multer from 'multer'


const storage  = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, './uploads')
  },
  filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage: storage})







const app = express();
app.use(cors());
app.use(express.json());
const filePath = "./dp/data.json";


app.use('/uploads', express.static('uploads'))

//nuotraukos

app.post('/photo', upload.single('failas'), (req,res) => {
  let image = '/uploads/' + req.file.filename
console.log(image)
  res.render('submited', {image, info:req.body})
})






//gaunam visa json
app.get('/', (req,res) => { 
    fs.readFile(filePath,'utf8', (err,data) => {
        let info = JSON.parse(data)
        if(err){
            throw err
        }else{ 
            res.json(info)
            
        }
    })
})


//gaunam id 
app.get('/new-blog/:id', (req,res) => {
    let id = req.params.id
  
    fs.readFile(filePath, 'utf8', (err,data) => {
      if(err){
        res.json({status:'failed', message: 'Nepavyko perskaityti failo'})
        return false 
      }
      let json = JSON.parse(data)
      let found = false 
  
      json.forEach((el,index) => { 
        if(el.id == id){
          res.json({status:'success', message:'Sekmingai perskaityti duomenys', jsonResp:el})
          found = true 
        }
      })
      if(!found){
        res.json({status:'failed', message:'Nepavyko surasti tokio id' })
      }
    })
  
  
  
  })
//issaugom
app.post("/save-request", (req, res) => {
    let masyvas = [];
  
    fs.access(filePath, (err) => {
      if (err) {
        req.body.id = 0;
        masyvas.push(req.body);
        fs.writeFile(filePath, JSON.stringify(masyvas), "utf8", (err) => {
          if (!err) {
            res.json({status:'success', message: "Informacija issaugota" });
          } else {
            res.json({status: 'failed', message: "Nepavyko sukurti aplanko" });
          }
        });
      } else {
        fs.readFile(filePath, "utf8", (err, val) => {
          if (err) {
            res.json({status:'failed', message: "ivyko klaida" });
            return false;
          }
          let json = JSON.parse(val);
          if(json.length == 0){
            req.body.id = 0
          }
          else{
            req.body.id = json[json.length - 1].id + 1
          }
          
          json.push(req.body);
          let info = JSON.stringify(json)
          console.log(info)
          fs.writeFile(filePath, info, "utf8", (err) => {
            if (!err) {
              res.json({status:'success', message: "Informacija issaugota", jsonResp: info });
            } else {
              res.json({ message: "Nepavyko sukurti aplanko" });
            }
          });
        });
      }
    });
})
//trinam pagal id 

app.delete('/new-blog/:id', (req,res) => { 
    let id = req.params.id

    fs.readFile(filePath, 'utf8', (err,data) => { 
        if(err){
            return false
        }else{
            let info = JSON.parse(data);
            let find = info.find((index) => index.id === parseInt(id));
            
            info.splice(info.indexOf(find), 1);
      
      
            if(json.length ==0){
              fs.unlink(filePath, err => {
                if(err){
                  res.json({status:'failed', message:'Nepavyko istrinti failo'})
                }else{
                  res.json({message: 'Failas istrintas'})
                }
              })
            }else{
            let jsonResp = JSON.stringify(info)
            fs.writeFile(filePath,jsonResp , "utf8", (err) => {
              if (err) {
                res.json({message: "Įvyko klaida, toks įrašas nerastas", status:'failed'});
              } else {
              res.json({message:"Įrašas sėkmingai ištrintas", status:'success', jsonResp});
              }
            });
          }}
        });
      });
        
    








app.listen(3001)