import { useState } from "react";
import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import UsersList from "./UsersList";

const Chat = ({ messages, sendMessage, closeConnection, users, updateStatus, cleaned }) => {
   const [status, setStatus] = useState(false);

  return (

    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>Leave Room</Button>
      </div>
      <div>
        {cleaned
        ?<Button variant="primary" onClick={() => updateStatus(status)}>Marked as clean</Button>
        :<Button variant="danger" onClick={() => updateStatus(status)}>Marked as unclean</Button>
        }
      </div>
      <UsersList users={users} />
      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;