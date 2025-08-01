import './App.css'
import {useEffect, useState} from "react";

function App() {
    // state to matain the search term
    const [SearchTerm, setSearchTerm] = useState('');
    // State to matain the suggested json
    const [suggestedVals, setSuggestedVals] = useState([]);


    // Function to fetch use data
    const FetchSuggestions = (() => {
            if (SearchTerm.trim() === "") {
                return
            } else {
                console.log(SearchTerm.trim())
                fetch(`https://dummyjson.com/users/search?q=${SearchTerm}&limit=10`)
                    .then(res => res.json())
                    .then(data => {setSuggestedVals(data.users)})
                    .catch(err => console.log(err))

            }
        })
    // use effect to run whenever the search term is re assigned
    useEffect(() => {
        FetchSuggestions()
    }, [SearchTerm]);
    // Dummy json
    console.log(suggestedVals)
    return (<div className="flex flex-col items-center justify-start">
            <div className="m-4 border-2 border-gray-300 mt-10 p-5">
                <h1 className="text-2xl font-semibold text-stone-600">React Multi Select Search</h1>
            </div>
            <div className="usersearch_input_container relative">
                {/*pills*/}
                {/*user search input field */}
                <input type="text" className="bg-gray-100 p-1 border-2 border-gray-300 rounded focus:
              outline-0 flex flex-row flex-wrap items-center w-[100%]" onChange={(e)=>{
                  setSearchTerm(e.target.value);
                }}/>
                <ul className="max-h-[400px] overflow-y-scroll p-2 absolute w-[250px]">
                    {suggestedVals.map((val, key) => (
                        <li className="flex flex-row items-center justify-around mb-2 bg-stone-100 rounded p-2 ">
                            <img src={val.image} alt={val.firstName+" "+val.lastName} className="h-[40px] "/>
                            <span>{val.firstName+" "+val.lastName}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>)
}

export default App
