//src/reducer.js

// just one big function
// with a bunch of conditionls

export default function reducer(state = {}, action) {
    // this is where the reducer takes current state
    // copies the current state
    // modifies the copy of the current state
    // returns modified state (as new current state)
    switch (action.type) {
        case "GET_FRIENDS_LIST":
            // what what?
            console.log("friendsRaw in reducer");
            console.log(
                "reducer saying action.allFriendsAndRequests",
                action.payload
            );
            state = {
                ...state,
                allFriendsAndRequests: action.payload, // whatever you called the key in actions.js
            };
            break;
        case "ACCEPT_FRIENDSHIP":
            console.log("reducer END_FRIENDSHIP");
            console.log("state before", state);
            // modify state
            // change .accepted for the user with id == payload
            state = {
                ...state,
                allFriendsAndRequests: state.allFriendsAndRequests.map(
                    (user) => {
                        if (user.id == action.payload) {
                            return {
                                ...user,
                                accepted: true,
                            };
                        } else {
                            return user;
                        }
                    }
                ),
            };
            console.log("state after", state);
            break;
        case "END_FRIENDSHIP":
            console.log("reducer END_FRIENDSHIP");
            console.log("state in reducer", state);
            console.log("allFriendsAndRequests", state.allFriendsAndRequests);
            // create new state
            state = {
                ...state,
                allFriendsAndRequests: state.allFriendsAndRequests.filter(
                    (user) => user.id != action.payload
                ),
            };
            console.log("state nach reducer", state);
            break;
        case "LOAD_TEN_CHAT":
            console.log("reducer LAST_TEN running");
            console.log("state in reducer", state);
            console.log("about to add: ", action.payload);
            // create new state
            action.payload.reverse();
            state = {
                ...state,
                chatMessages: action.payload,
            };
            console.log("state nach reducer", state);
            break;
        case "CHAT_NEW_MESSAGE":
            console.log("reducer CHAT_NEW_MESSAGE running");
            console.log("state in reducer", state);
            console.log("about to add: ", action.payload);
            // create new state
            let newArr = state.chatMessages.slice();
            newArr.push(action.payload);
            console.log("newArr", newArr);
            state = {
                ...state,
                chatMessages: newArr,
            };
            console.log("state nach reducer", state);
            break;
        case "OVERWRITE_ONLINE_USERS_LIST":
            console.log("reducer OVERWRITE_ONLINE_USERS_LIST runnin");
            console.log("action.payload: ", action.payload);
            state = {
                ...state,
                onlineUsersDetails: action.payload,
            };
    }
    return state;
}

// type: "LOAD_TEN",
// payload: messages,

/// REDUCER NIMMT DATEN AN UND UPDATED STATE

// var ob = {
//     name: "Andrea",
// };

// // 1. SPREAD OPERATOR (shallow copy)
// var newObj = {
//     ...obj,
// };

// var newObj = {
//     ...obj,
//     last: "Arias",
// };

// var arr = [1, 2, 3];
// var newArr = [...arr];
// var newArrImproved = [...arr, 4];

// 2. MAP - works on arrays
// is a loop, is handed a function, returns a new array
// useful for cloning looping and changing element in array

// 2. FILTER
// also a loop
// creates a copy of the array that you 're looping over and
// then REMOVES  things from the copy

// mount -> dispatch -> action.js (has server request inside)
// received data will be sent to reducer
// reducer changes the state (with new copy)

// newly modified state is handed to redux
