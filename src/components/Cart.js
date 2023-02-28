import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ProductInCart from './ProductInCart';

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
              this.round(acc+this.round(curr.count*curr.coast))
              ,0)
  
      const windowInnerWidth = window.innerWidth
      if(windowInnerWidth < 1200){
        return (      
          <>
            <Fab onClick={() => this.props.onClick(this.props.isVisible)}
                        sx={{position:'fixed', bottom:20, right:20}} 
                        color="primary" aria-label="open shopping cart" size="large">
              <Badge badgeContent={countProducts} color="primary">
                <ShoppingBasketOutlinedIcon/>
              </Badge>
            </Fab>
            <Drawer anchor='right'
                    open={this.props.isVisible}
                    onClose={() => this.props.onClick(this.props.isVisible)}
                    PaperProps={{sx:{width:{xs:'100%', sm:'50%'}}}}
                    >
              <Grid container justifyContent='space-between' alignItems='center'>
                <Typography variant='h5' color='green' margin={2}>Корзина</Typography>
                <IconButton onClick={() => this.props.onClick(this.props.isVisible)}>
                  <CloseIcon/>
                </IconButton>
              </Grid>
              <Grid container direction='column' p={1} 
                    sx={{marginBottom:'30px','&::-webkit-scrollbar': {width: 0}}}
                    overflow="scroll" wrap='nowrap'>
                {products}
              </Grid>
              <Button variant="contained" 
                      sx={{width:'100%', position: "absolute", bottom: 0, borderRadius:0,
                      display:sum===0 ? 'none' : 'block'}}>
                Оплатить {sum}$
              </Button>
            </Drawer>
          </>
        )
      }else{
        return (
          <div sx={{position:"absolute", right:0}}>
            <Typography variant='h5' color='green'>Корзина</Typography>
            <Grid container direction='column' wrap='nowrap'>
              {products}
              <Button variant="contained" 
                      sx={{display:sum===0 ? 'none' : 'block'}}>
                Оплатить {sum}$
              </Button>
            </Grid>
         </div>
        )
      }   
    }
  }

export default Cart;