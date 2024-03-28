const MessageContainer = ({messages})=>{
    return <div>
        {
           messages && messages.map((msg, index)=>
            <table>
                <tr key={index}>
                    <td>{msg.msg} - {msg.username}</td>
                </tr>
            </table>)
        }
    </div>
}

export default MessageContainer;