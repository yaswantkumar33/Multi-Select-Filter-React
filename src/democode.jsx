import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/pill";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserSet, setSelectedUserSet] = useState(new Set());
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const inputRef = useRef(null);

    // Fetch users when searchTerm changes
    useEffect(() => {
        const fetchUsers = () => {
            setActiveSuggestion(0);
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }

            fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch((err) => {
                    console.error(err);
                });
        };

        fetchUsers();
    }, [searchTerm]);

    const handleSelectUser = (user) => {
        setSelectedUsers([...selectedUsers, user]);
        setSelectedUserSet(new Set([...selectedUserSet, user.email]));
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    };

    const handleRemoveUser = (user) => {
        const updatedUsers = selectedUsers.filter(
            (selectedUser) => selectedUser.id !== user.id
        );
        setSelectedUsers(updatedUsers);

        const updatedEmails = new Set(selectedUserSet);
        updatedEmails.delete(user.email);
        setSelectedUserSet(updatedEmails);
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Backspace" &&
            e.target.value === "" &&
            selectedUsers.length > 0
        ) {
            const lastUser = selectedUsers[selectedUsers.length - 1];
            handleRemoveUser(lastUser);
            setSuggestions([]);
        } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) =>
                prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : 0
            );
        } else if (
            e.key === "Enter" &&
            activeSuggestion >= 0 &&
            activeSuggestion < suggestions.users.length
        ) {
            handleSelectUser(suggestions.users[activeSuggestion]);
        }
    };

    return (
        <div className="user-search-container">
            <div className="user-search-input">
                {/* Pills */}
                {selectedUsers.map((user) => (
                    <Pill
                        key={user.email}
                        image={user.image}
                        text={`${user.firstName} ${user.lastName}`}
                        onClick={() => handleRemoveUser(user)}
                    />
                ))}

                {/* Input field with search suggestions */}
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search For a User..."
                        onKeyDown={handleKeyDown}
                    />

                    {/* Search Suggestions */}
                    <ul className="suggestions-list">
                        {suggestions?.users?.map((user, index) =>
                                !selectedUserSet.has(user.email) ? (
                                    <li
                                        className={index === activeSuggestion ? "active" : ""}
                                        key={user.email}
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <img
                                            src={user.image}
                                            alt={`${user.firstName} ${user.lastName}`}
                                        />
                                        <span>
                    {user.firstName} {user.lastName}
                  </span>
                                    </li>
                                ) : null
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;































import './App.css';
import { useEffect, useState } from 'react';
import Pills from './Pills.jsx';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestedVals, setSuggestedVals] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserSet, setSelectedUserSet] = useState(new Set());

    const fetchSuggestions = () => {
        if (searchTerm.trim() === '') {
            setSuggestedVals([]);
        } else {
            fetch(`https://dummyjson.com/users/search?q=${searchTerm}&limit=10`)
                .then((res) => res.json())
                .then((data) => {
                    setSuggestedVals(data.users);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [searchTerm]);

    const handleSelectClick = (user) => {
        setSelectedUsers([...selectedUsers, user]);
        setSelectedUserSet(new Set([...selectedUserSet, user.email]));
        setSearchTerm('');
        setSuggestedVals([]);
    };

    const handleRemoveUser = (user) => {
        const updated = selectedUsers.filter((u) => u.email !== user.email);
        setSelectedUsers(updated);
        const updatedSet = new Set(selectedUserSet);
        updatedSet.delete(user.email);
        setSelectedUserSet(updatedSet);
    };

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="m-4 border-2 border-gray-300 mt-10 p-5">
                <h1 className="text-2xl font-semibold text-stone-600">React Multi Select Search</h1>
            </div>

            <div className="usersearch_input_container relative w-[600px]">
                {/* Pills + Input */}
                <div className="flex items-center flex-wrap gap-2 border-2 border-gray-300 rounded-full px-3 py-2 w-full bg-white">
                    {selectedUsers.map((user) => (
                        <Pills
                            key={user.email}
                            image={user.image}
                            text={`${user.firstName} ${user.lastName}`}
                            removeuser={() => handleRemoveUser(user)}
                        />
                    ))}

                    <input
                        type="text"
                        className="flex-grow p-1 outline-none text-gray-700 bg-transparent"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Search For a User..."
                    />
                </div>

                {/* Suggestions */}
                {suggestedVals.length > 0 && (
                    <ul className="max-h-[400px] overflow-y-scroll p-2 absolute w-full bg-white shadow rounded z-50 mt-1">
                        {suggestedVals.map((val, key) =>
                            !selectedUserSet.has(val.email) ? (
                                <li
                                    key={key}
                                    className="flex flex-row items-center gap-2 mb-2 bg-stone-100 rounded p-2 cursor-pointer hover:bg-stone-200 transition"
                                    onClick={() => handleSelectClick(val)}
                                >
                                    <img src={val.image} alt={`${val.firstName} ${val.lastName}`} className="h-[40px] w-[40px] rounded-full" />
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


























