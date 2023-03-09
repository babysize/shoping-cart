import React from 'react';
import ReactDOM from 'react-dom/client';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Products from './resourses/Products.json'

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: Products,
      cart: [],
      cartIsVisible: false,
      width:0,
      scroll:0,
    }
  }

  addNewProductInCart(product) {
    const products = this.state.products.map(p =>
      p.id === product.id
        ? {...p, count: 1} 
        : p)
    this.setState({
      cart: [...this.state.cart, {...product,...{ count: 1}}],
      products: products
    })
  }

  changeCountByOne(id,count,isAdd) {
    const number = isAdd ? 1 : -1

    const products = this.state.products.map(p =>
      p.id === id
        ? {...p, count: p.count+number} 
        : p)

    const cart = (count === 1 && !isAdd)
                ? this.state.cart.filter(p => p.id !== id)
                : this.state.cart.map(p =>
                      p.id === id
                      ? {...p, count: p.count+number} 
                      : p) 

    this.setState({
      cart: cart,
      products: products
    })
  }

  handleChangeCount(id, number) {
    const cart = this.state.cart.map(p =>
                      p.id === id
                      ? {...p, count: number} 
                      : p)    

    this.setState({
      cart: cart,
    })
  }

  editCount(id,count){
    const n = count>0  ? count : 1

    const products = this.state.products.map(p =>
      p.id === id
        ? {...p, count: n} 
        : p)
    
    const cart = this.state.cart.map(p =>
                      p.id === id
                      ? {...p, count: n} 
                      : p)    

                    
    this.setState({
      cart: cart,
      products: products
    })
  }

  deletProductFromCart(id){
    const products = this.state.products.map(p =>
      p.id === id
        ? {...p, count: 0} 
        : p)

    const cart = this.state.cart.filter(p => p.id !== id)
    this.setState({
      cart: cart,
      products: products,
    })
  }

  showCart(cartIsVisible){
    this.setState({
      cartIsVisible: !cartIsVisible
    })
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth});
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render () {
    return(
    <>
      <Typography variant='h2' margin={3} color='green'>Market</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <ProductList products={this.state.products}
                    addNewProductInCart={product => this.addNewProductInCart(product)}
                    changeCountByOne={(id,count,isAdd) => this.changeCountByOne(id,count,isAdd)}
        />
        </Grid>
        <Grid item lg={3}>
        <Cart cart={this.state.cart}
                      isVisible={this.state.cartIsVisible}
                      onClick={cartIsVisible => this.showCart(cartIsVisible)}
                      changeCountByOne={(id,count,isAdd) => this.changeCountByOne(id,count,isAdd)}
                      deletProductFromCart={id => this.deletProductFromCart(id)}
                      handleChangeCount={(id,number) => this.handleChangeCount(id,number)}
                      editCount={(id,count) => this.editCount(id,count)}
        />
        </Grid>
      </Grid>
    </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Shop/>);