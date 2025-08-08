import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectionDB } from "./config";
import Signup from "./controllers/signup";
import { signin } from "./controllers/signin";
import { auth } from "./middlewares/auth";
import { addContent } from "./controllers/addContent";
import { getContent } from "./controllers/getContent";
import { deleteContent } from "./controllers/deleteContent";
import { updateContent } from "./controllers/updateContent";
import { getContentById } from "./controllers/getContentById";

mongoose.connect(connectionDB)

const app = express();

 app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

//api routes
app.post("/api/v1/signup",Signup);

app.post("/api/v1/signin",signin);

//@ts-ignore
app.post("/api/v1/content",auth,addContent);

//@ts-ignore
app.get("/api/v1/content/:type",auth,getContent);

//@ts-ignore
app.get("/api/v1/content/id/:contentId",auth,getContentById);

//@ts-ignore
app.get("/api/v1/content",auth,getContent);

//@ts-ignore
app.put("/api/v1/content/:contentId",auth,updateContent);

//@ts-ignore
app.delete("/api/v1/content/:contentId",auth,deleteContent);


app.listen(8000, () => {
    console.log("Server is running")
})

export default app;