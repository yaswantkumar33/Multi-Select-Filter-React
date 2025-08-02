import './App.css';
import { useEffect, useState } from 'react';
import Pills from './Pills.jsx';

function App() {
    const [SearchTerm, setSearchTerm] = useState('');
    const [suggestedVals, setSuggestedVals] = useState([]);
    const [selectedusers, setSelectedusers] = useState([]);
    const [selecetedsetusers, setSelecetedsetusers] = useState(new Set());

    // Fetch suggestions
    const FetchSuggestions = () => {
        if (SearchTerm.trim() === '') {
            setSuggestedVals([]);
        } else {
            fetch(`https://dummyjson.com/users/search?q=${SearchTerm}&limit=10`)
                .then((res) => res.json())
                .then((data) => {
                    setSuggestedVals(data.users);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        FetchSuggestions();
    }, [SearchTerm]);

    const handleSelectClick = (selected_user) => {
        setSelectedusers([...selectedusers, selected_user]);
        setSelecetedsetusers(new Set([...selecetedsetusers, selected_user.email]));
        setSuggestedVals([]);
        setSearchTerm("")
    };

    const  handleRemoveUser = (removeuser)=>{
        console.log(removeuser)
        setSelectedusers(
            selectedusers.filter((user) => user.email !== removeuser.email)
        )
    }

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="m-4 border-2 border-gray-300 mt-10 p-5">
                <h1 className="text-2xl font-semibold text-stone-600">
                    React Multi Select Search
                </h1>
            </div>

            <div className="flex relative w-[800px] border-2 border-gray-300 p-2 rounded-lg">
                <div className="flex flex-row items-center flex-wrap gap-2 w-full">
                    {selectedusers.length > 0 &&
                        selectedusers.map((user) => (
                            <Pills
                                text={user.firstName}
                                key={user.email}
                                image={user.image}
                                handleRemoveUser={handleRemoveUser}
                                user={user}
                            />
                        ))}
                    <input
                        type="text"
                        className="pl-2 text-lg font-semibold text-stone-600 focus:outline-0 flex-grow"
                        placeholder="Search users..."
                        value={SearchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {suggestedVals.length > 0 && (
                    <ul className="max-h-[400px] overflow-y-scroll p-2 absolute top-full mt-2 w-[400px] bg-white rounded shadow z-50">
                        {suggestedVals.map((val, key) =>
                            !selecetedsetusers.has(val.email) ? (
                                <li
                                    key={key}
                                    className="flex flex-row items-center justify-around mb-2 bg-stone-100 rounded p-2 cursor-pointer hover:bg-stone-200"
                                    onClick={() => handleSelectClick(val)}
                                >
                                    <img
                                        src={val.image}
                                        alt={`${val.firstName} ${val.lastName}`}
                                        className="h-[40px] rounded-full"
                                    />
                                    <span>{val.firstName + ' ' + val.lastName}</span>
                                </li>
                            ) : null
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
