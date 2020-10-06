import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Axios from "./axios";
import ProfilePic from "./profilePic";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [title, setTitle] = useState("Most recently registered Users:");
    const [users, setUsers] = useState([]);
    //const [mounted, setMounted] = useState("");
    const handleChange = (e) => {
        setUserInput(e.target.value);
    };
    useEffect(() => {
        console.log("useEffect running");
        let ignore = false;
        if (!userInput) {
            (async () => {
                try {
                    console.log("ajax about to start!");
                    const { data } = await Axios.get("/api/recent-users/");
                    console.log("data: ", data);
                    setUsers(data);
                    let mounted = true;
                } catch (err) {
                    console.log("error", err);
                }
            })();
        } else {
            setTitle("Search results:");
            // const formData = new FormData();
            // formData.append(("userInput", userInput));
            console.log("now go an get the ones i am searching for, maDUDE");
            const requestUrl = "/api/find-users/" + userInput;

            (async () => {
                try {
                    console.log("ajax about to start!");
                    const { data } = await Axios.post(requestUrl);
                    setUsers(data);
                } catch (err) {
                    console.log("error ", err);
                }
            })();
        }
        // ,
        // [userInput]
        // }
        return () => {
            console.log("cleanup running");
            ignore = true;
        };
    }, [userInput]);

    return (
        <div className="search-container">
            <div className="row">
                <input
                    onChange={handleChange}
                    name="search"
                    type="text"
                    placeholder="search here"
                />
                <div className="button">AJAX</div>
            </div>
            <p>{title}</p>
            <div className="result-list">
                {users.map((user, i) => {
                    return (
                        <Link key={i} to={"/users/" + user.id} className="link">
                            <div key={i} className="row">
                                <ProfilePic
                                    imageUrl={user.image_url}
                                    first={user.first}
                                    last={user.last}
                                    key={i}
                                />
                                <h4 key={user.id}>
                                    {" "}
                                    {user.first} {user.last}
                                </h4>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
