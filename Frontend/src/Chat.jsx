import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContent";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply , setReply] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {

    if(reply == null) {
      setLatestReply(null);
      return ; 
    }



    if (!prevChats?.length) return;

    const lastChat = prevChats[prevChats.length - 1];
    if (lastChat.role !== "assistant") return;

    const content = lastChat.content.split(""); // split into characters for smooth typing
    let idx = 0;

    let isCancelled = false; // cleanup flag for Strict Mode

    const interval = setInterval(() => {
      if (isCancelled) return;

      setLatestReply(content.slice(0, idx + 1).join(""));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 20); // 20ms per character

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [prevChats]);

  return (
    <div className="container">
      {/* {newChat && <h1>Start a new chat</h1>} */}
{/*  This we have changed so that we get the text olor as black in light mode  */}
      {newChat && <h1 className="startNewChat">Start a new chat</h1>}

      <div className="chats">
        {prevChats?.map((chat, idx) => {
          // Skip the last assistant message (we will render it separately)
          const isLastAssistant =
            idx === prevChats.length - 1 && chat.role === "assistant";
          if (isLastAssistant) return null;

          return (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}


{/*  you can also write this in form of ternary operators converting it into single function 

*/}
        {/* Render the last assistant message with typing effect */}
        {prevChats.length > 0 && latestReply !== null && (
          <div className="gptDiv" key="typing">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply}
            </ReactMarkdown>
          </div>
        )}


          {prevChats.length > 0 && latestReply === null && (
          <div className="gptDiv" key="typing">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {prevChats[prevChats.length-1].content}
            </ReactMarkdown>
          </div>
        )}

      </div>
    </div>
  );
}

export default Chat;
