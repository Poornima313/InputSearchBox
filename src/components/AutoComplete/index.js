import React, { useState } from 'react';
import SearchComponent from '../SearchComponent';
import usersList from '../../resources/userData.json';

const AutoComplete = () => {
  const [user, setUser] = useState("");

  return(
    <div className='row mt-5'>
      <div className='col-md-6 m-auto'>
        <h3 className='text-center mb-3'>User Search</h3>
        <SearchComponent data={usersList} onSelect={(user) => setUser(user)} />
      </div>
      {/* {JSON.stringify(usersList)} */}
    </div>
  )
}

export default AutoComplete;