import React, {useState, useEffect} from "react";

function IncrementalSearch() {
    const [userInput, setUserInput] = useState(""); // empty string just for legibility, not necessary
    const [countries, setCountries] = useState([]);
    const handleChange = e =>{
        setUserInput(e.target.value);
    };
    // when the component mounts useEffect runs!
    // when I type in the input field useEffect runns again
    // useEffect uses a function as an argument
    // runs every single time when state is updated! IF YOU DONT GIVE A SECOND ARG - UNLESS [array]
    // IF we pass an empty array as athe 2nd argument - it runds ONL> when the component mounts & never again 
    // cannot use async in useEffect directly, MUST use an iife
    // useEffect will run anytime the values of vars that I pass in the array update! - Pass as many vars as you want in [array]
    useEffect(()=> {
        //console.log("useEffect is running - fn() as an argument")
        // watch out for infinte loops
            console.log("useEffect running")
        let ignore = false;
        console.log(countries);
        (async () => {
            try {
            const {data} = await Axios.get("spicedworld.herokuapp.com/?q=" + userInput);
            //setCountries(data);
                if (!ignore) {
                    setCountries(data);
                } else {
                    console.log("ignored!")
                }
        } catch {
            console.log("err", err)
        })();

        return () => {
            console.log("cleanup function is running")
            ignore = true;
        }
        };
    
    }, [userInput]) // empty array = didMountFn | [userInput] = runs every time userInput changes

    return (
        <div>
            <h1>Incermental Search</h1>
            <p>{userInput</p>
            <input onChange={handleChange} name="search" type="text" />
            // every array has map() method - expects fn as arg
            { countries.map((country,i) => {
                return <p key={i}>{country}</p>
            })}
        </div>
    )
}