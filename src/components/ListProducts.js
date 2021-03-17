// import React,{useState,useEffect} from 'react';
import CardProduct from './CardProduct';
function ListProducts(props) {
console.log(props)
  return (
    <div>
        <div style={{ display:'grid', gridAutoFlow:'column','gap':'20px', padding:'20px' }}>
        {
          props.products.map((product,index) => {
            return (
                <CardProduct key={index} product={product}/>
            )
          })
        }
        </div>
        
    </div>
  );
}

export default ListProducts;