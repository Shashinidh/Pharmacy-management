import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SupplieCrud from './Component/SupplieCrud';
import Add from './Component/Add';
import Details from './Component/Details';
import Delete from './Component/Delete';
import Edit from './Component/Edit';
import SearchForm from './Component/SearchForm';

function App() {
  return (
    <div className="App">
      <Router>
  
      <Routes>
        
        <Route path="/" element={<SupplieCrud/>} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/add" element={<Add />} />
        <Route path="/details" element={<Details/>} />
        <Route path="/delete" element={<Delete/>} />
        <Route path="/edit" element={<Edit/>} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;

