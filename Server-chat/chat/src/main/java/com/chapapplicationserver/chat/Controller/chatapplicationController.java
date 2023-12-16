package com.chapapplicationserver.chat.Controller;


import com.chapapplicationserver.chat.Collection.ChatRoom;
import com.chapapplicationserver.chat.Collection.User;
import com.chapapplicationserver.chat.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","https://chatyaad-frontend-production.up.railway.app/"})
@RequestMapping(path = "api/v1/chat")
public class chatapplicationController {
    private UserService userService;
    private ChatRoomService chatRoomService;


    @PostMapping("/register-save")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UsernameAlreadyExistException {
        return userService.registerUserMethod(user);
    }

    @PostMapping("/login-user")
    public ResponseEntity<?> loginUser(@RequestBody User user) throws Exception {
        return userService.loginUser(user);
    }



    @PostMapping("/createchatroom")
    public ResponseEntity<?> creatNewChatRoom(@RequestBody ChatRoom chatRoom){
        return chatRoomService.saveChatRoom(chatRoom);
    }

    @GetMapping("/getallchatrooms")
    public List<ChatRoom> getAllChatRooms() {
        try{
            return chatRoomService.getAllChatRooms();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Collections.EMPTY_LIST;

    }

    @GetMapping("/getchatroom/{id}")
    public ChatRoom getChatRoomById(@PathVariable Integer id) {
        return chatRoomService.getChatRoomById(id);
    }


}
