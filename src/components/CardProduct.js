import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import initFirebase from '../database'
import React, { useState } from 'react'
const useStyles = makeStyles({
  root: {
    Width: 250,
  },
  media: {
    height: 140,
  },
});
export default function MediaCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] =useState(props.product.name)
  const [price, setPrice] =useState(props.product.price)
  const [description,setDescription] = useState(props.product.description)
  const [stock,setStock] = useState(props.product.stock)
  const db = initFirebase.firestore()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editProduct = ()=>{
    db.collection('products').doc(props.product.id).set({
      name,
      price,
      description,
      stock
    }).then(()=>{
      handleClose()
      
    })
  }
  const deleteProduct = ()=>{
    let confirmation = window.confirm('Are you sure to delete this product?')
    if(confirmation){
      db.collection('products').doc(props.product.id).delete().then(
        ()=>{
          console.log('Borrado')
        }
      )
    }
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.product.name}            
          </Typography>
          <Typography variant="subtitle1" component="h2">
          {props.product.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
            $ {props.product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleClickOpen} size="small" color="primary">
          Edit
          </Button>
        <Button onClick={deleteProduct} size="small" color="primary">
          Delete
          </Button>
      </CardActions>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={e =>{
              setName(e.target.value)
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            value={description}
            onChange={e =>{
              setDescription(e.target.value)
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            value={price}
            onChange={e =>{
              setPrice(e.target.value)
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="stock"
            type="text"
            value={stock}
            onChange={e =>{
              setStock(e.target.value)
            }}
            fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={editProduct} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}