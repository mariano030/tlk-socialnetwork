import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfilePic from "./profilePic";

export default function OnlineUser(props) {
    console.log("Online Users running");
    const onlineUsersDetails = useSelector((state) => {
        console.log("my mental state", state);
        console.log("props.userId", props.userId);
        if (
            state.onlineUsersDetails != undefined &&
            state.onlineUsersDetails.length >= 1
        ) {
            const onlineUsersDetailsFiltered = state.onlineUsersDetails.filter(
                (element) => element.id != props.userId
            );
            return onlineUsersDetailsFiltered;
        } else {
            return state.onlineUsersDetails;
        }
    });
    useEffect(() => {});
    return (
        <>
            <div className="online-users">
                {onlineUsersDetails &&
                    onlineUsersDetails.map((user) => {
                        return (
                            <Link
                                to={"/users/" + user.id}
                                className="link"
                                style={{ textDecoration: "none" }}
                                key={user}
                            >
                                <div className="online-single-user">
                                    <div>
                                        <ProfilePic
                                            imageUrl={user.image_url}
                                            myClassName="profile-chat"
                                            myBorderClassName="online-users-border"
                                        />
                                    </div>
                                    <div>
                                        {user.first} {user.last}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </>
    );
}
