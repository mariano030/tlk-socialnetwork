import { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(url, values)
            .then(({ data }) => {
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`error in axios post /${url}`, err);
                setError(true);
            });
    };

    return [error, handleSubmit];
}

// custom hooks
// component login & registration
// 2 fn
// fn 1 login
// fn 2 registration

// import {useStatfulFields}  // useStatefulFields does not even have any divs
// the stateful hooks just RETRUN smoething
// in this example an array with error and the function handleSubmit
// handleSubmit does an axios query with variable data TO a variable url

// the parent element references the fn handleSubmit

// custom hook useStatefulFields()
// destructure variable and changeVar-Method from useState(datatype you will want here)
// return - retruns an array [var, method]
