import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptRequest,
    getFriendsList,
    endFriendship,
} from "./redux/actions.js";
import ProfilePic from "./profilePic";

export default function Friends(props) {
    //const {}
    //const selector = useSelector();
    const dispatch = useDispatch();
    //const friendsAndRequests = useSelector((state) => state.myFriends);
    //const friends = useSelector((state) => state.myFriends);
    //  &&

    const friends = useSelector(
        (state) =>
            state.allFriendsAndRequests &&
            state.allFriendsAndRequests.filter((item) => item.accepted == true)
    );

    const requests = useSelector(
        (state) =>
            state.allFriendsAndRequests &&
            state.allFriendsAndRequests.filter((item) => item.accepted == false)
    );
    //state.friendsList.filter((item) => item.accepted == true);
    console.log("allofem", friends);
    useEffect(() => {
        // console.log("this is logging");
        // start react action here
        dispatch(getFriendsList()); // hands over to actions and reducer
        //selector();
        //console.log(store.getState());
        console.log("in useEffect", friends);
        console.log("requests", requests);
    }, []);

    // return  <>
    //             <div>
    //                 {friends.}
    //         { countries.map((country,i) => {
    //             return <p key={i}>{country}</p>
    //         })}
    if (friends === undefined) {
        return "loading";
    } else {
        return (
            <>
                <div className="row-left">
                    {friends &&
                        friends.map((friend, i) => {
                            return (
                                <div key={i}>
                                    <Link
                                        to={"/users/" + friend.id}
                                        className="link"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <ProfilePic
                                            imageUrl={friend.image_url}
                                            myClassName="profile-picture"
                                        />
                                    </Link>
                                    <div className="text">
                                        {friend.first} {friend.last}
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => {
                                            dispatch(endFriendship(friend.id));
                                        }}
                                    >
                                        Unfriend
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="row-left">
                    {requests &&
                        requests.map((request, i) => {
                            return (
                                <div key={i}>
                                    <Link
                                        to={"/users/" + request.id}
                                        className="link"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <ProfilePic
                                            imageUrl={request.image_url}
                                            myClassName="profile-picture"
                                        />
                                    </Link>
                                    <div className="text">
                                        {request.first} {request.last}
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => {
                                            dispatch(acceptRequest(request.id));
                                        }}
                                    >
                                        Become Friends
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }
    // }
    //return <>{friendsAndRequests}</>;
}
