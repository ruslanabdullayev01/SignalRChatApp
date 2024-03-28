import { Col, Row, Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WaitingRoom from "./components/WaitingRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";

function App() {
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    const joinChatRoom = async (username, chatroom) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5044/chat")
                .configureLogging(LogLevel.Information)
                .build();

            //set up handler
            conn.on("JoinSpecificChatRoom", (username, msg) => {
                console.log("msg: ", msg);
            });

            conn.on("ReceiveSpecificMessage", (username, msg) => {
                console.log("msg:"+msg+" username "+username)
                setMessages(messages=>[...messages,{username,msg}])
            });

            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { username, chatroom });

            setConnection(conn);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (message) => {
        try {
            await conn.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <main>
                <Container>
                    <Row class="px-5 my-5">
                        <Col sm="12">
                            <h1 className="font-weight-light">
                                Welcome to my ChatApp
                            </h1>
                        </Col>
                    </Row>
                    {!conn ? (
                        <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
                    ) : (
                        <ChatRoom
                            messages={messages}
                            sendMessage={sendMessage}
                        ></ChatRoom>
                    )}
                </Container>
            </main>
        </div>
    );
}

export default App;
