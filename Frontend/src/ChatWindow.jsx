import './ChatWindow.css';
import { useContext, useState, useEffect} from 'react';
import { MyContext } from './MyContent';
import {HashLoader} from "react-spinners";
import Chat from './Chat.jsx'


function ChatWindow() {
  const { prompt, setPrompt, reply, setReply,currThreadId,prevChats, setPrevChats ,theme, setTheme } = useContext(MyContext);
  //  this is to avoid the loader to be present at all times because we only want it to be present when the response that is the ans is delayed 
  //  so we initialize it with false first
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // this will track if my dropdown is
  //  open or not  later we will add the default to false
// const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  if (!setPrompt) return null; // safeguard if context is undefined



    useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!setPrompt) return null;


  const getReply = async () => {
    // now its the delay time soo. loading state has to be true 
    setLoading(true);
    console.log("message" , prompt , "threadId", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try{
      // this is our backends local host
      const response = await fetch("http://localhost:8080/api/chat", options);
      //  now to print the answer to the response -> 
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    }
    catch(err){
      console.log(err);
    }
    

    //  again seeting the loading state to false because now we have recieved the answer and we have displaye it
    setLoading(false);
  }

  // Appending new chat to prevChats
  useEffect(() => {
  if (prompt && reply) {
    setPrevChats(prevChats => [
      ...prevChats,
      { role: "user", content: prompt },
      { role: "assistant", content: reply }
    ]);
  }

  setPrompt("");
}, [reply]);




  return (
    <div className="chat-window">
      <div className="navbar">
        <span className="heading">
          HelpGPT <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv"   onClick={() => setIsOpen(prev => !prev)}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

{/*  this is for the dropdown button  */}
          {isOpen && (
        <div className="dropDown">
          <div
            className="dropDownItem"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <i className="fa-solid fa-gear"></i> Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log in
          </div>
        </div>
      )}


      <Chat></Chat>

<HashLoader color={theme === 'dark' ? '#fff' : '#000'} loading={loading} />


      <div className="chatInput">
        <div className="inputbox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            //  if you want the prompt to be sent even after pressing enter key then 
            onKeyDown={(e) => e.key === "Enter"? getReply() : ''}
          />
          <div
            id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          HelpGpt can make mistakes. Check important info. See Cookie Preference.
        </p>

      </div>
    </div>
  );
}

export default ChatWindow;
