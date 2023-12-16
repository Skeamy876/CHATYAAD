package com.chapapplicationserver.chat.Controller;

import com.chapapplicationserver.chat.Collection.ChatMessage;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Objects;

@Controller
@CrossOrigin(origins = {"http://localhost:3000","https://chatyaad-frontend-production.up.railway.app/"} , allowedHeaders = "*" ,
        allowCredentials = "true",
        exposedHeaders = "Access-Control-Allow-Origin")
public class WebSocketController {
    private final Logger log = LoggerFactory.getLogger(WebSocketController.class);
    @MessageMapping("/chat.register")
    @SendTo("/chatRoom/public")
    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username",chatMessage.getSender());
        log.info("Message that client has joined: {}",chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.send")
    @SendTo("/chatRoom/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        log.info("Message sent from client to public chat: {}",chatMessage);
        return chatMessage;
    }




}
