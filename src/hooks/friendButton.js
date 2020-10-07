import { IdentityStore } from "aws-sdk";
import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("loading");
    const [error, setError] = useState(false);
    console.log("props", props);
    const userId = props.userId;
    // const getButtonText = (otherUserId) => {
    //     console.log("getTextButton running");
    // };
    const handleClick = () => {
        (async () => {
            try {
                console.log("THE USER ID FOR THE OTHER PERSON", userId);
                const { data } = await axios.post("/api/update-friendship/", {
                    params: { otherId: userId },
                });
                setButtonText(data.buttonText);
            } catch (err) {
                console.log("error updateing friend status", err);
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

    // when componenet mounts, in use Effect, make a request to the
    // server to find out the relationship status with the user
    // if button says bla -> specific db request

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

// one post route or multiple -

// if accepted is false where should it say what?
// accept / pending

// after changing friendship status - send new button Text for client
