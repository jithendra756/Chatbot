import { useRef, useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "./chatbotproject.css";
import downArrow from "./assets/down-arrow.png";

export default function ChatbotProject() {

    const [chatMessages, setChatMessages] = useState([
    {
        message: `Hello! how can i help you..  
        flip a coin, roll a dice, or get today's date`,
        sender: "robot",
        id: 1
    }
    ]);

    const [currInput, setCurrInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const mesEndRef = useRef(null);

    const scrollToBottom = () => {
        mesEndRef.current?.scrollIntoView({behavior : "smooth"});
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    async function sendMesssage() {

        if(currInput.trim() !== ""){

            const userMsg = {
                message: currInput,
                sender: 'user',
                id: crypto.randomUUID()
            }
            const newChatMessages = [
                ...chatMessages,
                userMsg
            ];
            setChatMessages(newChatMessages);

            setCurrInput("");
            setIsLoading(true);

            setChatMessages([
                ...newChatMessages,
                {
                    message: "Loading...",
                    sender: "robot",
                    id: "loading"
                }
            ])
    
            // eslint-disable-next-line no-undef
            const response = await Chatbot.getResponseAsync(currInput);
            setIsLoading(false);
            setChatMessages([
                ...newChatMessages,
                {
                    message: response,
                    sender: "robot",    
                    id: crypto.randomUUID()
                }
            ]);
        }
        setCurrInput("");
    }

    function handleInputChange(text){
        setCurrInput(text);
    }

    function handleKey(e){
        if(e.key === "Enter" && !isLoading){
            sendMesssage();
        }
        else if(e.key==="Escape"){
            setCurrInput("");
        }
    }

    return (
        <div className="parent">

            <div className="contain">

                <div className="chat-header">

                    <ChatInput onInputChange={handleInputChange} inputValue={currInput} onClicked={sendMesssage} handleKey={handleKey} isLoading={isLoading}/>

                </div>
                <div className="chat-msg-but">

                    <div className="chat-msg">
                        {
                            chatMessages.map(chat => {
                                return (
                                    <ChatMessage message={chat.message} sender={chat.sender} key={chat.id}/>
                                )
                            })
                        }
                    </div>
                    <div className="but">
                        <button onClick={scrollToBottom}>
                            <img src={downArrow}/>
                        </button>
                    </div>
                </div>

                <div ref={mesEndRef}></div>
            </div>
        </div>
    );
}