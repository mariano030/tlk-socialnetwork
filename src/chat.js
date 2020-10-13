import React, { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef(); // to manipulate the dom maunally, reference an element of DOM
    const chatMessages = useSelector((state) => state && state.chatMessages);
    // will be undefined for now
    console.log("chatMessages: ", chatMessages);

    useEffect(() => {
        // update scroll postition every time a chat message comes in!
        console.log("useEffect Running ...");
        console.log("elemRef.current", elemRef.current);
        // do math for scrolling
        console.log("elemRef.current.scrollTop:", elemRef.current.scrollTop); // current position   0
        console.log("elemRef.current.scrollTop:", elemRef.current.scrollHeight); //                 360
        console.log("elemRef.current.scrollTop:", elemRef.current.clientHeight); // height of chat textbox 300
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []); // only once, will probably want to do it every time ne msg!
    function keyCheck(e) {
        if (e.key == "Enter") {
            e.preventDefault(); // why do we need it again?
            // thanks babel
            "e.target.value:", e.target.value;
            // create obj that has more info??? or on server?
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    }
    return (
        <div>
            <h1>chatty chat</h1>
            <div className="chat-container" ref="{elemRef}">
                <p>This what a message will look like...</p>
                <p>Map these actually for each message...</p>
            </div>
            <textarea
                onKeyDown={keyCheck}
                placeholder="Add your message here..."
            ></textarea>
        </div>
    );
}
