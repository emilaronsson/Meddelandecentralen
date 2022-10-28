import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/Chat';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState()

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .configureLogging(LogLevel.Information)
        .build();

      setRoom(room);

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      })

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const updateStatus = async (status) => {
    try {
      await connection.invoke("UpdateStatus", status)
      
    } catch (e) {
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>HotelChatter</h2>
    <hr className='line' />
    {!connection
      ? <Lobby joinRoom={joinRoom} />
      : <Chat
        messages={messages}
        sendMessage={sendMessage}
        closeConnection={closeConnection}
        users={users}
        updateStatus={updateStatus}
        connection={connection}
        room={room} />
    }
  </div>
}

export default App;