import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const CrudComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idNo, setIdNo] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('');

  const createSupplie = async (e) => {
    e.preventDefault();

    const newSupplie = {
      name,
      email,
      idNo,
      address,
      product,
    };

    try {
      const response = await axios.post(
        'http://localhost:8070/supplie/add',
        newSupplie
      );
      console.log(response.data);
      resetForm();
      window.alert('Supplier created successfully!');
    } catch (error) {
      console.error(error);
      window.alert('Failed to create supplie.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setIdNo('');
    setAddress('');
    setProduct('');
  };

  return (
    <div className='page'>
      <div className='headerback'>
        <Link to='/'>
          <button className='btn'>BACK</button>
        </Link>
      </div>
      <Header />
      <h2>Create New Supplier</h2>
      <form className='form' onSubmit={createSupplie}>
        <div className='addCard'>
          <label className='txt'>Name:</label>
          <input
            className='Intxt'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='in'>
          <label className='txt'>Email:</label>
          <input
            className='Intxt'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='in'>
          <label className='txt'>ID Number:</label>
          <input
            className='Intxt'
            type='text'
            value={idNo}
            onChange={(e) => setIdNo(e.target.value)}
            required
          />
        </div>
        
        <div className='in'>
          <label className='txt'>Address:</label>
          <input
            className='Intxt'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='in'>
          <label className='txt'>Product:</label>
          <input
            className='Intxt'
            type='text'
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <button type='submit'>Create Supplie</button>
      </form>
    </div>
  );
};

export default CrudComponent;
