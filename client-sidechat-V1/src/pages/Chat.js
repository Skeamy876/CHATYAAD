import React,{useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';


let stompClient = null;
const Chat = () => {   
    const testUrl = 'http://localhost:8080/connectpoint'
    const serverurl= 'http://chatspringapp-env-2.eba-hyskc2i5.us-east-1.elasticbeanstalk.com/'
    const[User, setUser] = useState({
        username:" ",
        message: " ",
        conected: false,
    });

    const [chatMessages, setChatMessages]=useState([
        {
            content:" ",
            sender:" ",
            timestamp:" ",
            type:" ",
        }
    ]);
    const [sendMessage, setSendMessage] = useState({
        content:" ",
        sender:" ",
        timestamp:" ",
        type:" ",
    });
    const [Users,setUsers] = useState([])
    const messageListRef = useRef(null);


    useEffect(()=>{
      
        setUser({
            username:localStorage.getItem('username'),
            conected: false,
        });
    },[]);

    const connect=()=>{
        const socket = new SockJS(testUrl);
        stompClient = over(socket);
        stompClient.connect({},function(frame){
            stompClient.debug("Connected: " + frame);
            stompClient.subscribe('/chatRoom/public', onMessageRecieved);
            onConnected();
        }); 
    }

    const onConnected =()=>{
        setUser({...User, conected: true})
        if (!Users.includes(User.username)) {
            Users.push(User.username);
            setUsers([...Users])
        }
        stompClient.send("/chatapp/chat.register", {},JSON.stringify({sender: User.username, type:"JOIN", timeStamp: getTime()})); 
    }
  
    const onSendChatMessage=()=>{
        if (stompClient) {
            stompClient.send("/chatapp/chat.send", {}, JSON.stringify(sendMessage));
        } 
    }

    const getTime=()=>{
        let timeElapsed = new Date();
        return timeElapsed = timeElapsed.toLocaleTimeString();
    };

    const onMessageRecieved=(payload)=>{
        let message = JSON.parse(payload.body);
        chatMessages.push(message);
        setChatMessages([...chatMessages]);
    };

    const handleChange = (e) => {
        const {value} = e.target; 
        setSendMessage({
            content: value,
            sender: User.username,
            timestamp: getTime(),
            type: 'CHAT'
        });
    };
    const handleKeydown= (e) =>{
        if(e.key ==='Enter'){
            onSendChatMessage();
        }
    }
    const scrollToBottom = () => {
        if (messageListRef.current) {
          messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };


    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    let JoinMessages = chatMessages.filter(message=>message.type ==="JOIN");
    let AllChatMessages = chatMessages.filter(message => message.type ==="CHAT");
    let colorForCurrentUser = getRandomColor();


    

    console.log(chatMessages)

    return (
        <>
            <div>
                {!User.conected? 
                <div className="container text-center mt-5">
                    <h1>Welcome to the ChatYaad</h1>
                    <p>Select chat from drop down then, Click on the button below to connect to the Chat Room</p>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option defaultValue={" "}> </option>
                        <option value="1">Room one</option>
                        <option value="2">Room Two</option>
                        <option value="3">Room Three</option>
                    </select>
                    
                    <button className="btn btn-primary btn-lg fixed-bottom" onClick={connect}>Connect</button>
                </div>
                :
                    <div className="area-container">                
                        <div className="chat-container">
                            <div className="chatRoomHead text-bg-dark">
                                    <h1 className="chatRoom_Header">ChatRoom</h1>
                                    <ul>{Users.map((user,index)=><li key={index} className=" p-1"  style={{display:"inline"}}> {user} </li>)}</ul>
                                </div>
                                <div className="chatRoom_Messages"ref={messageListRef} >
                                    <div className="card messsage-list" >
                                        <ul className="list-group list-group-flush">
                                            {JoinMessages.map((message, index)=>(
                                                <li key={index} className="list-group-item"> {message.sender} has joined the chat</li> 
                                            ))}
                                        {AllChatMessages.map((message, index) => (
                                            <li key={index} className="list-group-item p-3">
                                                {message.sender !== User.username && (
                                                    <div id="author" style={{ color: getRandomColor() }}>
                                                        {message.sender}
                                                    </div>
                                                    )}
                                                    {message.sender === User.username && (
                                                    <div id="author" style={{ color: colorForCurrentUser }}>
                                                        {message.sender}
                                                    </div> 
                                                    )} :
                                                {message.content}
                                            </li>
                                        ))}
                                        </ul>
                                        {scrollToBottom()}
                                    </div>
                                </div>
                                <div className="chatRoom_Input">
                                <input type="text" 
                                    onChange={handleChange}  
                                    onKeyDown={handleKeydown} 
                                    placeholder="Type your message here..."/>
                                    <button type="submit" 
                                    onClick={onSendChatMessage}>Send</button>                  
                                </div>
                            </div>
                        </div>
                }
    
                    </div>
        
        </>
    
        
            
        
    );
};

export default Chat;