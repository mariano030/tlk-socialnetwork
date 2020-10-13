import React, { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import ProfilePic from "./profilePic.js";

export default function Chat(props) {
    const elemRef = useRef(); // to manipulate the dom maunally, reference an element of DOM
    const chatMessages = useSelector((state) => state && state.chatMessages);
    const userId = useSelector((state) => state && state.userId);
    // will be undefined for now
    console.log("chatMessages: ", chatMessages);
    function scrollDown() {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }
    useEffect(() => {
        // update scroll postition every time a chat message comes in!
        console.log("useEff ect Running ...");
        console.log("elemRef.current", elemRef.current);
        // do math for scrolling
        console.log("elemRef.current.scrollTop:", elemRef.current.scrollTop); // current position   0
        console.log(
            "elemRef.current.scrollHeight:",
            elemRef.current.scrollHeight
        ); //                 360
        console.log(
            "elemRef.current.clientHeight:",
            elemRef.current.clientHeight
        ); // height of chat textbox 300
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }); // only once, will probably want to do it every time ne msg!
    function keyCheck(e) {
        if (e.key == "Enter") {
            console.log("enter pressed");
            e.preventDefault(); // why do we need it again? bubbling?
            // thanks to babel we do not need to use the keycode
            console.log("e.target.value:", e.target.value);
            // create obj that has more info??? or on server?
            console.log("state", userId);
            /// ###
            // i can maybe just get from the dbizzay
            // const newChatMessageFromMe = {
            //     id: props.userId,
            //     image_url: props.imageUrl,
            //     first: props.first,
            //     last: props.last,
            //     message: e.target.value,
            // };
            socket.emit("newChatMsgFromClient", e.target.value);
            e.target.value = "";
        } else {
            console.log("other key than enter pressed");
        }
    }
    return (
        <div>
            <h3 onClick={scrollDown}>tlk.</h3>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message, i) => {
                        return (
                            <div key={i} className="chat-message-container">
                                <div className="row">
                                    <div key={i}>
                                        <ProfilePic
                                            imageUrl={message.image_url}
                                            myClassName="profile-chat"
                                            myBorderClassName="profile-chat-border"
                                        />
                                    </div>
                                    <div>
                                        <p className="chat-info">
                                            <strong>
                                                {message.first} {message.last}
                                            </strong>
                                            <span className="chat-date">
                                                {" " +
                                                    message.created_at.substring(
                                                        0,
                                                        10
                                                    )}
                                            </span>
                                        </p>
                                        <p className="chat-msg">
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                onKeyDown={keyCheck}
                className="chat-input"
                placeholder="Add your message here..."
            ></textarea>
        </div>
    );
}
