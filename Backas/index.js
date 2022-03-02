import express, { json } from "express";
import cors from "cors";
import * as fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
const filePath = "./dp/data.json";









//gaunam visa json
app.get('/', (req,res) => { 
    fs.readFile(filePath,'utf8', (err,data) => {
        let info = JSON.parse(data)
        if(err){
            req.json({status:'failed', message:"Nepavyko perskaityti failo"})
        }else{ 
            res.json({status:'success', jsonResp: info })
            
        }
    })
})


//gaunam id 
app.get('/:id', (req,res) => {
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






app.listen(3001)