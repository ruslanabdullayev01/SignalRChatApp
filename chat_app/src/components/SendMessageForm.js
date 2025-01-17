import { useState } from "react"
import { InputGroup, Form, Button } from "react-bootstrap";

const SendMessageForm = ({sendMessage})=>{
    const [msg, setMessage] = useState('');

    return <Form onSubmit={e=>{
        e.preventDefault();
        sendMessage(msg);
        sendMessage('');
    }}>
        <InputGroup className="mb-3">
            <InputGroup.Text>Chat</InputGroup.Text>
            <Form.Control onChange={e=>setMessage(e.target.value)} value={msg} placeholder="type a message"></Form.Control>
            <Button variant="primary" type="submit" disabled={!msg}>Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;