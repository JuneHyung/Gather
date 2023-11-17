import { useCallback, useEffect, useState } from "react";
import { disconnectSocket, initSocketConnection, socket } from "../../api/chat/chat";


const ChatPage = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  
  useEffect(()=>{
    initSocketConnection();
    return () => disconnectSocket();
  }, [])

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      console.log(name, message);
      setChat([...chat, { name, message }]);
    });
  }, [chat]);

  const onTextChange = useCallback((e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  },[state]);

  const onMessageSubmit = useCallback((e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });

  },[state]);

  const renderChat = useCallback(() => {
    // console.log("here?");
    return chat.map(({ name, message }, idx) => (
      <li key={name + message + idx}>
          <span className="log-name">{name}</span>  <span className="log-message">{message}</span>
      </li>
    ));
  },[chat]);
  return (
    <div className="chat-wrap-box">
      <ul class="chat-log">
        {renderChat()}
      </ul>
      <form onSubmit={onMessageSubmit} className="chat-input-box">
        <label className="input-box name-input">
          <input name="name" onChange={onTextChange} value={state.name} placeholder="Name"/>
        </label>
        <label className="input-box message-input">
          <input name="message" onChange={onTextChange} value={state.message} placeholder="Enter Your Message" />
        </label>
        <button className="send-button">Send Message</button>
      </form>
    </div>
  );
};

export default ChatPage;
