import * as io from "socket.io-client";
// will need to import relevant actions later!!

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessage", (msg) => {
            console.log("i hope i can see this: ", msg);
        });
        // socket.on("chatMessages", (chatMessages) => {
        //     console.log("messages:", chatMessages);
        //     // dispatch an action (using an cation creator)
        //     store.dispatch();
        // });
    }
};
