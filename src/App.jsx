import './App.css'
import {useEffect, useState} from "react";
import Pills from "./Pills.jsx";

function App() {
    // state to matain the search term
    const [SearchTerm, setSearchTerm] = useState('');
    // State to matain the suggested json
    const [suggestedVals, setSuggestedVals] = useState([]);
    const [selectedusers, setSelectedusers] = useState([]);
    const [selecetedsetusers, setSelecetedsetusers] = useState(new Set());


    // Function to fetch use data
    const FetchSuggestions = (() => {
        if (SearchTerm.trim() === "") {
            setSuggestedVals([]);
        } else {
            // console.log(SearchTerm.trim())
            fetch(`https://dummyjson.com/users/search?q=${SearchTerm}&limit=10`)
                .then(res => res.json())
                .then(data => {
                    setSuggestedVals(data.users)
                })
                .catch(err => console.log(err))

        }
    })
    // use effect to run whenever the search term is re assigned
    useEffect(() => {
        FetchSuggestions()
    }, [SearchTerm]);
    // function to select the user
    const handleSelectClick = (selected_user) => {
        // console.log("Selected user", selecetedsetusers);
        // setSelecteduser(new Set([...selecteduser,selected_user]))
        setSelectedusers([...selectedusers, selected_user]);
        setSelecetedsetusers(new Set([...selecetedsetusers, selected_user.email]));
        setSuggestedVals([]);
    }
    return (
        <div className="user-search-container">

        </div>
    )
}

export default App
