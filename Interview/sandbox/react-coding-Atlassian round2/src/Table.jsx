import { useState } from "react";

function searchUsers(query, users) {
    const clone = users.slice();

    return clone.filter((user) => {
        return Object.values(user).some((val) => {
            return String(val).toLowerCase().includes(String(query).toLowerCase());
        });
    });
}

function sortingUsers(searchedUsers, sortField, sortDirection) {
    const clone = searchedUsers.slice();

    if(sortField==""&& sortDirection==""){
        return clone
    }

    switch (sortField) {
        case "age":
            sortDirection == "asc"
                ? clone.sort((a, b) => a[sortField] - b[sortField])
                : clone.sort((a, b) => b[sortField] - a[sortField]);
            break;
        case "firstName":
        case "lastName":
        case "country":
        case "favoriteFood":
            sortDirection == "asc"
                ? clone.sort((a, b) => a[sortField].localeCompare(b[sortField]))
                : clone.sort((a, b) => b[sortField].localeCompare(a[sortField]));

            break;
    }

    return clone
}

export default function Table({ users, columns }) {
    const [inputText, setInputText] = useState("");

    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

       let  searchedUsers = searchUsers(inputText, users);

    let sortedUsers = sortingUsers(searchedUsers, sortField, sortDirection);


    function handleSort(key) {

        if (sortField != key) {
            setSortField(key);
            setSortDirection("asc");
        } else {

            if (sortDirection == "desc") {
                setSortDirection("")
                setSortField("")
                
                //sortingUsers(users, sortField, sortDirection)
            } else {
                sortDirection == "asc"
                    ? setSortDirection("desc")
                    : setSortDirection("asc");
            }

        }
    }

    function handleSearch(e) {
        setInputText(e.target.value);
    }

 

    return (
        <>
            <div className="search-container">
                <input
                    type="search"
                    name="search"
                    id="search"
                    value={inputText}
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <table>
                <thead>
                    <tr style={{ backgroundColor: "grey" }}>
                        {columns.map(({ key, label }, index) => (
                            <th
                                key={index}
                                style={{ border: "1px solid grey", color: "grey" }}
                            >
                                <button type="button" onClick={() => handleSort(key)}>
                                    {label}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 &&
                        sortedUsers.map((user, index) => (
                            <tr key={index}>
                                {columns.map(({ key }, index) => (
                                    <td
                                        style={{ border: "1px solid grey", alignItems: "center" }}
                                        key={index}
                                    >
                                        {user[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
