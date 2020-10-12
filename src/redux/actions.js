// src/action.js

// will conatian all of our action createor functions
// action creator is a function that runs & returns an obj,
//   with a property called TYPE
// the obj that is returned is called an action

import axios from "../axios"; // machen wir in actions

//example code
export function fn() {
    return {
        type: "LOAD_BIO",
    };
}

export async function getFriendsList() {
    // hier kann ich alles machen!
    console.log("ey die action läuft");
    try {
        const result = await axios.get("/api/get-friends-list");
        console.log("result", result);
        console.log("esult.data.friendsRawArr?", result.data.friendsRawArr);
        const allFriendsAndRequests = result.data.friendsRawArr;
        return {
            type: "GET_FRIENDS_LIST",
            payload: allFriendsAndRequests,
        };
    } catch (err) {
        console.log("error in getFriendsList", err);
    }
}

export async function acceptRequest(userId) {
    console.log("action accept rq running");
    try {
        // add user id to post req!!!
        await axios.post("/api/update-friendship/");
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            payload: userId,
        };
    } catch (err) {
        console.log("error accepting freq", err);
    }
}

/*

            try {
                const friendRelations = await axios.get("/api/get-friens-list");
                // put it in state yall
            } catch (err) {}
            var newState = {
                ...state,
            };

*/
