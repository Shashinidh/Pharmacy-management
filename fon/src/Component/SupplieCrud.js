import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you have imported Link from react-router-dom
import { useReactToPrint } from 'react-to-print';
import Header from "../Component/Header"

const CrudComponent = () => {
  const [supplies, setSupplies] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idNo, setIdNo] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('');
  const componentPDF = useRef(); // Added useRef for the PDF component reference

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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSupplie = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/supplie/delete/${id}`
      );
      console.log(response.data);
      fetchSupplies();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setIdNo('');
    setAddress('');
    setProduct('');
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: () => {
      alert('Data Saved in PDF');
      return '';
    },
  });

  return (
    <div className="page">
      <div className='hButton'>
        <div className="hh">
          <Link to="/add">
      <button className="btn" >
                Add
              </button>
      </Link>
      <Link to="/details">
      <button className="btn" >
                Details
              </button>
      </Link>
      <Link to="/delete">
      <button className="btn" >
                Delete
              </button>
      </Link>
      <Link to="/search">
      <button className="btn" >
               Search
              </button>
      </Link>
      
      
      <Link to="/edit">
      <button className="btn" >
             Edit
              </button>
      </Link></div>
      
        <div ref={componentPDF} style={{ width: '100%' }}>
          <Header/>

          <h2>Supplier's List</h2>
          <table className="table">
            <thead className="Thead">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Address</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody className="Tbody">
              {supplies.map((supplie) => (
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
      </div>
    </div>
  );
};

export default CrudComponent;
