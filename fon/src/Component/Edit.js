import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const CrudComponent = () => {
  const [supplies, setSupplies] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idNo, setIdNo] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [successAlert, setSuccessAlert] = useState('');
  const [failureAlert, setFailureAlert] = useState('');

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = async () => {
    try {
      const response = await axios.get('http://localhost:8070/supplie');
      setSupplies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      fetchSupplies();
      resetForm();
      setSuccessAlert('Supplier created successfully.');
      setFailureAlert('');
      window.alert('Supplier created successfully.');
    } catch (error) {
      console.error(error);
      setFailureAlert('Failed to create supplier.');
      setSuccessAlert('');
      window.alert('Failed to create supplier.');
    }
  };

  const deleteSupplie = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/supplie/delete/${id}`
      );
      console.log(response.data);
      fetchSupplies();
      setSuccessAlert('Supplier deleted successfully.');
      setFailureAlert('');
      window.alert('Supplier deleted successfully.');
    } catch (error) {
      console.error(error);
      setFailureAlert('Failed to delete supplier.');
      setSuccessAlert('');
      window.alert('Failed to delete supplier.');
    }
  };

  const updateSupplie = async (id) => {
    setUpdateId(id);
    const supplieToUpdate = supplies.find((supplie) => supplie._id === id);
    setName(supplieToUpdate.name);
    setEmail(supplieToUpdate.email);
    setIdNo(supplieToUpdate.idNo);
    setAddress(supplieToUpdate.address);
    setProduct(supplieToUpdate.product);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    const updatedSupplie = {
      name,
      email,
      idNo,
      address,
      product,
    };

    try {
      const response = await axios.put(
        `http://localhost:8070/supplie/update/${updateId}`,
        updatedSupplie
      );
      console.log(response.data);
      fetchSupplies();
      resetForm();
      setSuccessAlert('Supplier updated successfully.');
      setFailureAlert('');
      window.alert('Supplier updated successfully.');
    } catch (error) {
      console.error(error);
      setFailureAlert('Failed to update supplier.');
      setSuccessAlert('');
      window.alert('Failed to update supplier.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setIdNo('');
    setAddress('');
    setProduct('');
    setUpdateId(null);
  };
  return (
    <div className='page'>
      <div className="headerback">
        <Link to="/">
          <button className="btn">BACK</button>
        </Link>
      </div>
      <Header/>
      <h2>Create New Supplier</h2>
      {successAlert && <div className="success-alert">{successAlert}</div>}
      {failureAlert && <div className="failure-alert">{failureAlert}</div>}
      {updateId ? (
                <div className='addCard'>

        <form onSubmit={submitUpdate}>
          <div className='in'>
            <label className='txt'>Name:</label>
            <input
            className='Intxt'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='in'>
            <label className='txt'>Email:</label>
            <input
            className='Intxt'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='in'>
            <label className='txt'>ID Number:</label>
            <input
            className='Intxt'
              type="text"
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              required
            />
          </div>
          <div className='in'>
            <label className='txt'>Address:</label>
            <input
            className='Intxt'
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='in'>
            <label className='txt'>Product:</label>
            <input
            className='Intxt'
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <button type="submit">Update Supplier</button>
          <button onClick={resetForm}>Cancel</button>
        </form>
        </div>
      ) : (
        <form onSubmit={createSupplie}>
          {/* Form fields for creating a new supplier */}
          <div className='addCard'>
          <div  className='in'>
            <label className='txt'>Name:</label>
            <input
            className='Intxt'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div  className='in'>
            <label className='txt'>Email:</label>
            <input
            className='Intxt'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div  className='in'>
            <label className='txt'>ID Number:</label>
            <input
            className='Intxt'
              type="text"
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              required
            />
          </div>
          
          <div  className='in'>
            <label className='txt'>Address:</label>
            <input
            className='Intxt'
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='in' >
            <label className='txt'>Product:</label>
            <input
            className='Intxt'
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div >
          <button type="submit">Create Supplier</button>
          </div>
        </form>
        
      )}

      <h2>Supplier's List</h2>
      <table className='table'>
        <thead  className='Thead'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID Number</th>
            <th>Address</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='Tbody'>
          {supplies.map((supplie) => (
            <tr key={supplie._id}>
              <td>{supplie.name}</td>
              <td>{supplie.email}</td>
              <td>{supplie.idNo}</td>
              <td>{supplie.address}</td>
              <td>{supplie.product}</td>
              <td>
                <button onClick={() => deleteSupplie(supplie._id)}>
                  Delete
                </button>
                <button onClick={() => updateSupplie(supplie._id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudComponent;
