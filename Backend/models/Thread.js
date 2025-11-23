import mongoose from "mongoose";


// this is our message schema
const MessageSchema = new mongoose.Schema({
    // this is required because we must know the differcne between a user generated message and a gpt generated message
   
    role:{ 
        type: String,
        enum: ["user","assistant"],
        required: true
    },

    content:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

//  generally we define one schema in a particular file but here since the message doesnot have its own importtence appart from being a part of a thread 
// so we will be defining the thread schema here as well

const ThreadSchema = new mongoose.Schema({

    threadId: {
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        default: "New Chat"
    },
    //  here we will take the message from messageSchema
    messages: [MessageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Thread", ThreadSchema);
