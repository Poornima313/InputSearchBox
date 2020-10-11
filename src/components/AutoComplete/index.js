import React, { useState } from "react";
import SearchComponent from "../SearchComponent";
import usersList from "../../resources/userData.json";

const AutoComplete = () => {
  const [user, setUser] = useState("");

  return (
    <div className="row mt-5">
      <SearchComponent data={usersList} onSelect={(user) => setUser(user)} />
    </div>
  );
};

export default AutoComplete;
