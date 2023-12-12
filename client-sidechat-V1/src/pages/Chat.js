import React,{useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';


let stompClient = null;
const Chat = () => {   
    const testUrl = 'http://localhost:8080/'
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
    const [inputValue, setInputValue] = useState('');


    useEffect(()=>{
      
        setUser({
            username:localStorage.getItem('username'),
            conected: false,
        });
    },[]);

    const connect=()=>{
        const socket = new SockJS(`${testUrl}connectpoint/`);
        stompClient = over(socket);
        stompClient.connect({},function(frame){
            stompClient.debug("Connected: " + frame);
            stompClient.subscribe('chatRoom/public', onMessageRecieved);
            onConnected();
        }); 
    }

    const onConnected =()=>{
        setUser({...User, conected: true})
        if (!Users.includes(User.username)) {
            Users.push(User.username);
            setUsers([...Users])
        }
        stompClient.send("chatapp/chat.register", {},JSON.stringify({sender: User.username, type:"JOIN", timeStamp: getTime()})); 
    }
  
    const onSendChatMessage=()=>{
        if (stompClient) {
            stompClient.send("chatapp/chat.send", {}, JSON.stringify(sendMessage));
            setSendMessage(prevMessage => ({ ...prevMessage, content: '' }));
            setInputValue('');
        } 
    }

    const getTime=()=>{
        let timeElapsed = new Date();
        return timeElapsed = timeElapsed.toLocaleTimeString();
    };

    const onMessageRecieved=(payload)=>{
        let message = JSON.parse(payload.body);
        console.log("This is onMessageRecieved")
        console.log(message);
        chatMessages.push(message);
        setChatMessages([...chatMessages]);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setSendMessage(prevMessage => ({ ...prevMessage, 
            content: e.target.value,
            timestamp: getTime(),
            type: "CHAT", 
        }));
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


    const avatars = [
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava7-bg.webp",
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava8-bg.webp",
    ];

    const getRandomAvatar = () => {
        return avatars[Math.floor(Math.random() * avatars.length)];
    };

    let JoinMessages = chatMessages.filter(message=>message.type ==="JOIN");
    let AllChatMessages = chatMessages.filter(message => message.type ==="CHAT");

        
    return (
    <>
        <div>
        {!User.conected ? 
            <div className="container text-center mt-5">
                <h1>Welcome to the ChatYaad</h1>
                <p>Select a chat room from the dropdown, then click on the button below to connect to the Chat Room</p>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option defaultValue={" "}>Select a room...</option>
                    <option value="1">Room one</option>
                </select>
                
                <button className="btn btn-primary btn-lg fixed-bottom" onClick={connect}>Connect</button>
            </div>
            :
            <section >
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-12">
                            <div className="card" id="chat1" style={{borderRadius: "15px"}}>
                                <div
                                    className="card-header d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom-0"
                                    style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>
                                    <i className="fas fa-angle-left"></i>
                                    <p className="mb-0 fw-bold">Chat Room</p>
                                    <i className="fas fa-times"></i>
                                </div>
                                <div className="card-body">
                                    {JoinMessages.map((message, index) => {
                                        return (
                                            <div className="d-flex flex-row justify-content-start mb-4" key={index}>
                                                <img src={getRandomAvatar()}
                                                    alt="avatar 1" style={{width: '45px', height: '100%'}} />
                                                <div className="p-3 ms-3" style={{borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                    <p className="small mb-0">{message.sender} joined the chat</p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {AllChatMessages.map((message, index) => {
                                        return (
                                            <div className="d-flex flex-row justify-content-start mb-4" key={index}>
                                                <img src={getRandomAvatar()}
                                                    alt="avatar 1" style={{width: '45px', height: '100%'}} />
                                                    <p>{message.sender}</p>
                                                <div className="p-3 ms-3" style={{borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                    <p className="small mb-0">{message.content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* <div className="d-flex flex-row justify-content-end mb-4">
                                        <div className="p-3 me-3 border" style={{borderRadius: '15px', backgroundColor: '#fbfbfb'}}>
                                            <p className="small mb-0">Thank you, I really like your product.</p>
                                        </div>
                                        <img src={getRandomAvatar()}
                                            alt="avatar 1" style={{width: '45px', height: '100%'}} />
                                    </div> */}
                                    {scrollToBottom()}
                                
                                    <div className="form-outline">
                                        <textarea 
                                        className="form-control" 
                                        id="textAreaExample" 
                                        rows="2" 
                                        value={inputValue}
                                        onChange={handleChange}
                                        onKeyDown={handleKeydown}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              
          

        }
        </div>
    </>
    );
};

export default Chat;