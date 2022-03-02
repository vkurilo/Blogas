import express, { json } from "express";
import cors from "cors";
import * as fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
const filePath = "./db/data.json";
