import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import UsersList from "./UsersList";

const Chat = ({ messages, sendMessage, closeConnection, users, updateStatus, connection, room }) => {
   const [statusChoice, setStatusChoice] = useState('');
   const [status, setStatus] = useState();

   console.log(room);
   useEffect(() => {
    connection.on("StatusUpdated", (status) => {
      setStatus(status);
      console.log(status);
    })
    connection.on("StatusInRoom", (status) => {
      setStatus(status)
    })
  }, [status])


  return (

    <div>
    <h1>Status for {room}: {status}</h1>
      <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>Leave Room</Button>
      </div>
      <div>

        <Form className="status"
        onSubmit={e => {
          e.preventDefault();
          updateStatus(statusChoice)
          setStatusChoice('')
        }}
        >

        <Form.Select aria-label="Default select example" onChange={e => setStatusChoice(e.target.value)}>
          <option disabled selected>select status</option>
          <option value="Clean">Clean</option>
          <option value="Unclean">Unclean</option>
        </Form.Select>
        <Button variant='success' type='submit' disabled={!statusChoice}>Set Status</Button>
        </Form>

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