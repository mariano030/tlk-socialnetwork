import React, { useEffect, useRef } from "react";
import ReactTimeAgo from "react-time-ago";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import ProfilePic from "./profilePic.js";

export default function PrivateChat() {
    const privateChatMessages = useSelector(
        (state) => state && state.privateChatMessages
    );
    const userId = useSelector((state) => state && state.userId);
    const requestUrl = "/api/other-user/" + this.props.match.params.id;
    const userIdToChatWith = this.props.match.params.id;
    console.log("userIdToChatWith:", userIdToChatWith);
    useEffect(() => {
        // get the messages from history
        //socket.emit("")
    }, []);
}
