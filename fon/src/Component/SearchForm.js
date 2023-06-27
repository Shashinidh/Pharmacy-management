import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./Header"

const SearchSupplies = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8070/supplie/search/${searchInput}`
      );
      setSearchResults(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to search supplies');
      setSearchResults([]);
    }
  };

  return (
    <div className='page'>
      <div className="headerback">
        <Link to="/">
          <button className="btn">BACK</button>
        </Link>
      </div>
      <Header/>
      <h2>Search Supplier's</h2>
      <form className='SearchInput' onSubmit={handleSearch}>
        <input
          className='Intxt'
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, email, ID, contact number, address, or product"
        />
        <button className='btn' type="submit">Search</button>
      </form>

      

      {error && <p>{error}</p>}

      {searchResults.length > 0 ? (
        <div>
    
          <h3>Search Results:</h3>
          <table className='table'>
            <thead className='Thead'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Address</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody className='Tbody'>
              {searchResults.map((supplie) => (
                <tr key={supplie._id}>
                  <td>{supplie.name}</td>
                  <td>{supplie.email}</td>
                  <td>{supplie.idNo}</td>
                  <td>{supplie.address}</td>
                  <td>{supplie.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchSupplies;
