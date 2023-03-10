import Button from '@mui/material/Button';
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductInCart from '../ProductInCart/ProductInCart';
import CartSmallScreen from './CartSmallScreen/CartSmallScreen';
import CartLargeScreen from './CartLargeScreen/CartLargeScreen';

class Cart extends React.Component {
    round(a){
      return Math.round((a+Number.EPSILON)*100)/100
    }
  
    render() {  
      const products = this.props.cart.map((product) =>
          <React.Fragment key={product.id}>
            <ProductInCart
              product={product}
              sum={this.round(product.coast*product.count)}
              changeCountByOne={(id,count,isAdd) => this.props.changeCountByOne(id,count,isAdd)}
              deletProductFromCart={(id) => this.props.deletProductFromCart(id)}
              handleChangeCount={(id,number) => this.props.handleChangeCount(id,number)}
              editCount={(id,count) => this.props.editCount(id,count)}
            />
            </React.Fragment>
            
          )
  
      const countProducts = products.length 
  
      const sum = this.props.cart.reduce((acc,curr) => 
                  this.round(acc+this.round(curr.count*curr.coast)),0)

      const cartSmall = <CartSmallScreen
                          cart={this.props.cart}
                          isVisible={this.props.isVisible}
                          onClick={cartIsVisible => this.props.onClick(cartIsVisible)}
                          products={products}
                          sum={sum}
                          countProducts={countProducts}>
                        </CartSmallScreen>

      const cartLarge = <CartLargeScreen
                          products={products}
                          sum={sum}>
                        </CartLargeScreen>
  
     
        return (
          this.props.width < 1200
          ? cartSmall
          : cartLarge
        )      
    }   
  }

export default Cart;