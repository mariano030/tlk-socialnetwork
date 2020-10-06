import React, {useState, useEffect} from React;

function IncrementalSearch() {
    const [userInput, setUserInput] = useState(""); // empty string just for legibility, not necessary
    const [countries, setCountries] = useState([]);
    const handleChange = e =>{
        setUserInput(e.target.value);
    };
    // when the component mounts useEffect runs!
    // when I type in the input field useEffect runns again
    // useEffect uses a function as an argument
    // runs every single time when state is updated!
    // cannot use async in useEffect directly, MUST use an iife
    useEffect(()=> {
        //console.log("useEffect is running - fn() as an argument")
        // watch out for infinte loops
        console.log(countries);
        (async () => {
            try {
            const {data} = await Axios.get("spicedworld.herokuapp.com/?q=" + userInput);
            setCountries(data);

        } catch {
            console.log("err", err)
        }
            
            
            )();
        }
    
    })

    return (
        <div>
            <h1>Incermental Search</h1>
            <p>{userInput</p>
            <input onChange={handleChange} name="search" type="text" />
        </div>
    )
}