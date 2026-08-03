import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./data";

import Table from "./Table";

export default function App() {
  const [users, setUsers] = useState([]);

  const columns = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Age", key: "age" },
    { label: "Country", key: "country" },
    { label: "Favorite Food", key: "favoriteFood" },
  ];

  useEffect(() => {
    async function load() {
      try {
        let userData = await getData();
        // console.log("userData",userData);
        setUsers(userData);
      } catch (err) {
        console.log(err);
      }
    }

    load();
  }, []);

  // console.log(users)

  return (
    <div className="App">
      <Table users={users} columns={columns}/>
    </div>
  );
}
