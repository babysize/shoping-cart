import React from 'react';
import ReactDOM from 'react-dom/client';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ProductCard(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
    <Paper 
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider'
      }}
    >
      <Grid container>
        <Grid item>
          <ButtonBase sx={{ width: 130, height: 130 }}>
            <Img alt="complex" src={props.path}/>
          </ButtonBase>
        </Grid>
        <Grid item xs sm container direction="column">
          <Grid item xs container direction="row">
            <Grid item xs={7}>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.name}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{textAlign:'end'}}>
              <Typography variant="subtitle1" component="div">
                {props.coast} $
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs container alignItems='end'>
            <Grid item>
              <IconButton onClick={()=>{props.onClick(props)}} 
                          sx={{display: props.count? 'none' : 'block'}} 
                          color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{display: props.count? 'block' : 'none', p:1}}>
              <Stack spacing={1} direction="row" alignItems={'center'}>
                <Button onClick={()=> {props.chanegCount(props,false)}} 
                        variant='outlined' size='small'
                        sx={{minWidth:30}} >
                  -</Button>
                <Typography gutterBottom variant="subtitle1" component="div" margin={0}>
                  {props.count} шт.
                </Typography>
                <Button onClick={() => {props.chanegCount(props,true)}} 
                        variant='outlined' size='small' 
                        sx={{minWidth:30}}>
                  +</Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>
  );
}

class ProductList extends React.Component {

    render() {
        const products = this.props.products.map((product) =>
          <ProductCard
            key={product.id}
            name={product.name}
            path={product.path}
            coast={product.coast} 
            count={product.count}
            onClick={() => this.props.onClick(product)}
            chanegCount={(product,isAdd) => this.props.chanegCount(product,isAdd)}
          />
        )

        return (
           <Grid container spacing={1}>
            {products}
          </Grid>
        )
    }
}

class ShoppingCart extends React.Component {
  
}

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [
        {
          id: '#1',
          name:'Carrot',
          path: "images/products/carrot.jpg",
          coast: 4.99,
          count: 0,
        },
        {
          id: '#2',
          name:'Tomato',
          path: "images/products/tomato.jpeg",
          coast: 9.49,
          count: 0,
        },
        {
          id: '#3',
          name:'Potato',
          path: "images/products/potato.jpeg",
          coast: 1.99,
          count: 0,
        },
        {
          id: '#4',
          name:'Cucumber',
          path: "images/products/cucumber.jpeg",
          coast: 2.49,
          count: 0,
        },
        {
          id: '#5',
          name:'Broccoli',
          path: "images/products/broccoli.jpeg",
          coast: 21.99,
          count: 0,
        },
        {
          id: '#6',
          name:'Onion',
          path: "images/products/onion.jpeg",
          coast: 0.99,
          count: 0,
        },
        {
          id: '#7',
          name:'Pumpkin',
          path: "images/products/pumpkin.jpeg",
          coast: 11.49,
          count: 0,
        }
        ],
      cart: [],
    }
  }

  handleClick(product) {
    const products = this.state.products.map(p =>
      p.name === product.name
        ? {...p, count: 1} 
        : p)
    this.setState({
      cart: [...this.state.cart, {...product,...{ count: 1}}],
      products: products
    })
  }

  chanegCount(product,isAdd) {
    const number = isAdd ? 1 : -1

    const products = this.state.products.map(p =>
      p.name === product.name
        ? {...p, count: p.count+number} 
        : p)

    const cart = product.count === 1 && !isAdd 
                ? this.state.cart.filter(p => p.name !== product.name)
                : this.state.cart.map(p =>
                      p.name === product.name
                      ? {...p, count: p.count+number} 
                      : p) 


    // const cart = []
    // if(product.count === 1 && !isAdd ){ 
    //     cart = this.state.cart.filter(p => p.name !== product.name)
    //   } else{
    //     cart = this.state.cart.map(p =>
    //     p.name === product.name
    //       ? {...p, count: p.count+number} 
    //       : p)  
    //   }

    this.setState({
      cart: cart,
      products: products
    })
  }

  render () {

    return(
    <div>
      <IconButton sx={{margin: 2}} 
                  color="primary" aria-label="open shopping cart">
        <ShoppingBasketOutlinedIcon/>
      </IconButton>
      <ProductList products={this.state.products}
                   onClick={product => this.handleClick(product)}
                   chanegCount={(product,isAdd) => this.chanegCount(product,isAdd)}
      />
    </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Shop/>);
