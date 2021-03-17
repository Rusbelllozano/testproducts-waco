import './App.css';
import db from './database/index'
import ListProducts from './components/ListProducts'
import React, { useState, useEffect } from 'react';
function App() {
  
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const response = db.collection('products');
    const data = await response.get();
    data.docs.forEach(item => {
      setProducts([...products, item.data()])
    })
  }
  useEffect(() => {
    fetchProducts();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
          <ListProducts products={products}></ListProducts>
        }
      </header>
    </div>
  );
}

export default App;
