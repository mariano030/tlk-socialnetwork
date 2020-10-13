import { IdentityStore } from "aws-sdk";
import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("loading");
    const [error, setError] = useState(false);
    console.log("props", props);
    const userId = props.userId;
    const handleClick = () => {
        // only useEffects needs an async iife other functions can be async themselves
        (async () => {
            try {
                console.log("THE USER ID FOR THE OTHER PERSON", userId);
                const { data } = await axios.post("/api/update-friendship/", {
                    params: { otherId: userId },
                });
                setButtonText(data.buttonText);
            } catch (err) {
                console.log("error updateing friend status", err);
                setError(error); // this working?
            }
        })();
    };

    useEffect(() => {
        console.log("useEffect in FriendButton running");
        console.log("userId", userId);
        (async () => {
            try {
                const reqUrl = "/api/friendship-status/" + userId;
                const { data } = await axios.get(reqUrl);
                console.log(data);
                setButtonText(data.buttonText);
            } catch (err) {
                console.log("error getting friendship status", err);
                setError(true);
            }
        })();
    }, []); // <<<<---- do this only once yall
    // need to acces id of user you want to change relationship with
    // this component will be rendered in otherProfile - pass down other persons id
    // console.log(prop)

    if (buttonText == "loading") {
        return null;
    } else {
        // render the button
        return (
            <div className="button" onClick={handleClick}>
                {buttonText}
            </div>
        );
    }
    //return <div className="button">{buttonText}</div>;
}

// server route - req to db to get friendship status
// dynamic get route check-friends-status/:otherUserId

// after changing friendship status - send new button Text for client!
