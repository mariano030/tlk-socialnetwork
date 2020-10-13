import * as io from "socket.io-client";
import { loadLastTenChatMessages, addNewMessage } from "./redux/actions.js";
// will need to import relevant actions later!!

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            console.log("i hope i can see this: ", msgs);
            store.dispatch(loadLastTenChatMessages(msgs));
        });
        socket.on("newChatMsgFromServer", (newMessage) => {
            console.log("newChatMsgFromServer:", newMessage);
            // dispatch an action (using an cation creator)
            store.dispatch(addNewMessage(newMessage));
        });
    }
};
