import robot from './assets/robot.png';
import user from './assets/user.png'
import "./chatmessage.css"

export default function ChatMessage({message, sender}) {

    const alignmentClass = sender === "robot" ? "robot-message" : "sender-message";
    return (
        <div className={`chatmes ${alignmentClass}`}>
            {sender === "robot" && <img src={robot} width="50"/>}
            {message}
            {sender === "user" && <img src={user} width="50"/>}
        </div>
    );
}

