import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = 8080;

// htis will parse our api reqests
//  these are the middle wares tha will be used when we call our backend apis fro the frontend
app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("CONNECTED WITH DATABASE");

        app.listen(PORT, () => {
    console.log( `server listening to port ${PORT}`)
    //  this function will be called every time when our server starts that is connecting to our data base
});

    }catch(err){
        console.log("failed to connect with db ",err);
    }
};
    connectDB(); 







//   all of this we have shifted to a different file -> openai.js
// app.post("/test", async(req , res) => {
//     const options = {
//         method: "POST",
//         headers:{
//            "Content-Type": "application/json" ,// this is taken fro open ai -> chat component
//             "Authorization":`Bearer ${process.env.OPENAI_API_KEY}` 
//         },
//         body: JSON.stringify({ // now here we will pass the required parameteres
//             model: "gpt-4o-mini",
//             messages:[{
//                 role:"user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try{
//         // this will take THE fetched data and save it in the reponse from the fetch api
//         const response = await fetch("https://api.openai.com/v1/chat/completions" , options);
//         //  here we are saving it in json format
//         const data = await response.json();
//         // console.log(data);
//         res.send(data.choices[0].message.content);
//     }catch(err){
//         console.log(err);
//     }
// });
