import React from 'react';
import ReactDOM from 'react-dom/client';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid(props) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 0.5,
        // maxWidth: 400,
        flexGrow: 1,
        border: 1,
        borderColor: 'divider'
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.path}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container direction="column">
          <Grid item xs container direction="row">
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {props.coast} $
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs container alignItems='end'>
            <Grid item>
              <IconButton onClick={()=>{props.onClick(props)}} 
                          sx={{display: props.count? 'none' : 'block',
                               }} 
                          color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{display: props.count? 'block' : 'none',p: 1}}>
                <Typography gutterBottom variant="subtitle1" component="div" margin={0}>
                  {props.count} шт.
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}



class ProductList extends React.Component {
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
          cart: []
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

    render() {
        const products = this.state.products.map((product) =>
          <ComplexGrid
            key={product.id}
            name={product.name}
            path={product.path}
            coast={product.coast} 
            count={product.count}
            onClick={product => this.handleClick(product)}
          />
        )

        return (
          <Grid container spacing={3} 
                alignItems="flex-start" justifyContent="space-between">
            <Grid item xs={6}>
              {products}
            </Grid>
            <IconButton sx={{marginTop: 3}} 
                        color="primary" aria-label="open shopping cart">
              <ShoppingBasketOutlinedIcon/>
            </IconButton>
          </Grid>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProductList />);
