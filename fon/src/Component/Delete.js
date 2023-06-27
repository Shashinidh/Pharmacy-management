import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./Header"

const CrudComponent = () => {
  const [supplies, setSupplies] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idNo, setIdNo] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('');

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
      window.alert('supplier created successfully!');
    } catch (error) {
      console.error(error);
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
      window.alert('Supplier deleted successfully!');
    } catch (error) {
      console.error(error);
      window.alert('Failed to delete supplier.');
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
      <div className="headerback">
        <Link to="/">
          <button className="btn">BACK</button>
        </Link>
      </div>
      <Header/>

      <h2>Supplier's List</h2>
      <table className='table'>
        <thead className='Thead'>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudComponent;
