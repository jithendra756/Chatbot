import "./chatinput.css"

export default function ChatInput({onInputChange, inputValue, onClicked, handleKey, isLoading}) {

    function saveInputText(event) {
        onInputChange(event.target.value);
    }

    function buttonClicked(){
        if(!isLoading)
            onClicked();
    }
    return (
        <div className="chatinput">
            <input className="inputBox" type="text" placeholder="Send a message to Chatbot..." size="30" onChange={saveInputText} value={inputValue} onKeyDown={handleKey}/>
            <button className="sendButton" onClick={buttonClicked}>Send</button>
        </div>
    );
}