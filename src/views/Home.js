import initFirebase from '../database'
import ListProducts from '../components/ListProducts'
import React, { useState, useEffect } from 'react';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {
    Button
} from '@material-ui/core';
function Home() {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = initFirebase.firestore().collection('products');
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
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ExitToApp />}
                    onClick={() => initFirebase.auth().signOut()}
                >
                    Sign out
                </Button>
                <h1>Home</h1>
                <Button variant="contained" color="primary">Add product</Button>

                {
                    <ListProducts products={products}></ListProducts>
                }
            </header>
        </div>
    );
}

export default Home;
