import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

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
      <div key={name + message + idx}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  },[chat]);
  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" onChange={onTextChange} value={state.name} />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input name="message" onChange={onTextChange} value={state.message} />
        </div>
        <button>Send Message</button>
      </form>
      <div>
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>
  );
};

export default ChatPage;
