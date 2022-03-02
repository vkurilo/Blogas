import express, { json } from "express";
import cors from "cors";
import * as fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
const filePath = "./db/data.json";


app.post('/post-request', (req,res) => { 
    console.log(req.body)
    res.send(req.body)
})








app.listen(3001)