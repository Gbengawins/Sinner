import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './App.css';
import Loader from './components/loader/Loader';

export default function App () {
  const [users, setUsers] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const handleFetch = () => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Oops! Unable to fetch users!");
        setIsLoading(false);
      });
  };
  const renderUser = (
    <div className="userlist-container">
      { users.map((item, index) => (
        // <img src={ item.avatar } alt="" />
        <div className="userDetails">
          <div className="userName">{ item.name }</div>
          <div className="userEmail">{ item.email }</div>
          <div className="userAddresses">{ item.addresses }</div>
          <div className="userPhone">{ item.phone }</div>
        </div>
      )) }
    </div>
  );
  return (
    <div className="App">
      { isLoading ? <Loader /> : renderUser }
      { errorMessage && <div className="error">{ errorMessage }</div> }
      <button onClick={ handleFetch } disabled={ isLoading }>Fetch Users </button>
    </div>
  );
}

// export default App;
