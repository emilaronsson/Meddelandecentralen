import { Button, Form } from "react-bootstrap"
import { useState } from "react";

const Lobby = ({joinRoom}) => {

    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return (
    <Form className='lobby'
    onSubmit={e => {
        e.preventDefault();
        joinRoom(user, room);
    }}
    >
    <Form.Group>
        <Form.Control placeholder='name' onChange={e => setUser(e.target.value)} />

        {/* <Form.Control placeholder='room' onChange={e => setRoom(e.target.value)}/> */}
        <Form.Select aria-label="Default select example" onChange={e => setRoom(e.target.value)}>
            <option disabled selected>select room</option>
            <option value="Lobby">Lobby</option>
            <option value="Konferensrum">Konferensrum</option>
            <option value="Restaurang">Restaurang</option>
        </Form.Select>
    </Form.Group>
    <Button variant='success' type='submit' disabled={!user || !room}>Join</Button>
    </Form>
    );
}

export default Lobby;