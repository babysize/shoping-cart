import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
  
  class ProductList extends React.Component {
  
      render() {
          const products = this.props.products.map((product) =>
          <React.Fragment key={product.id}>
            <ProductCard
              product={product}
              addNewProductInCart={() => this.props.addNewProductInCart(product)}
              changeCountByOne={(id,count,isAdd) => this.props.changeCountByOne(id,count,isAdd)}
            />
          </React.Fragment>
          )
  
          return (
             <Grid container spacing={1} overflow="scroll" sx={{'&::-webkit-scrollbar': {width: 0}}}>
              {products}
            </Grid>
          )
      }
  }

  export default ProductList;