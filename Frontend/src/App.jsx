import './App.css';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContent.jsx';



import { useState } from 'react';
import { use } from 'react';
import {v1 as uuidv1} from "uuid";


function App() {
  const[prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const[currThreadId, setCurrThreadId] = useState(uuidv1()); // here the unique id for thr thread will nbe obtained
 const[prevChats, setPrevChats]=useState([]); // this is to store all the chats of the curr thread
 const[newChat, setNewChat] = useState(true); // this is to store new chats
const [allThreads, setAllThreads] = useState([]);

// Theme state (shared globally)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    newChat, setNewChat,
    prevChats,setPrevChats,
    allThreads, setAllThreads,
      theme, setTheme  // <-- adding theme here

  }; // your context values

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
