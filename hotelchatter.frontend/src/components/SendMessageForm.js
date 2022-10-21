import { useState } from "react"
import { Form, Button, FormControl, InputGroup } from "react-bootstrap"

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');


    return (
        <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
            <InputGroup>
                <FormControl placeholder='Type your message here...' 
                   onChange={e => setMessage(e.target.value)} value={message} />
                <InputGroup>
                    <Button variant="primary" type="submit" disabled={!message}>Send</Button>
                </InputGroup>
            </InputGroup>
        </Form>
    )
}

export default SendMessageForm;