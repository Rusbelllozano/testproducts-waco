import initFirebase from '../database'
import ListProducts from '../components/ListProducts'
import React, { useState, useEffect } from 'react';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';




function Home() {
    const [products, setProducts] = useState([])
    const [nameNew, setNameNew] = useState('')
    const [descriptionNew, setDescriptionNew] = useState('')
    const [priceNew, setPriceNew] = useState('')
    const [stockNew, setStockNew] = useState('')
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addProduct = () => {
        const db = initFirebase.firestore()
        db.collection('products').add({
            name: nameNew,
            description: descriptionNew,
            price: priceNew,
            stock: stockNew
        }).then(() => {
            handleClose()
        })
    }
    const fetchProducts = async () => {
        const response = initFirebase.firestore().collection('products');
        const data = await response.get();
        setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    if(products.length === 0){
        return(
            <div className="App-main">
                <h3>Loading Products</h3>
            </div>
           
        )
    }
    return (
        <div className="App">
            <div className="App-main">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ExitToApp />}
                    onClick={() => initFirebase.auth().signOut()}
                >
                    Sign out
                </Button>
                <h1>Home</h1>
                <Button variant="contained" onClick={handleClickOpen} color="primary">Add product</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            value={nameNew}
                            onChange={e => {
                                setNameNew(e.target.value)
                            }}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            value={descriptionNew}
                            onChange={e => {
                                setDescriptionNew(e.target.value)
                            }}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Price"
                            type="text"
                            value={priceNew}
                            onChange={e => {
                                setPriceNew(e.target.value)
                            }}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="stock"
                            label="stock"
                            type="text"
                            value={stockNew}
                            onChange={e => {
                                setStockNew(e.target.value)
                            }}
                            fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={addProduct} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    <ListProducts products={products}></ListProducts>
                }
            </div>
        </div>
    );
}

export default Home;
