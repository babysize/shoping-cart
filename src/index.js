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
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import { type } from '@testing-library/user-event/dist/type';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function ProductCard(props) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
    <Paper 
      sx={{
        p: 1,
        border: 1,
        borderColor: 'divider'
      }}
    >
      <Grid container>
        <Grid item>
          <ButtonBase sx={{ width: 100, height: 100 }}>
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
                  {props.count} кг
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
           <Grid container spacing={1} overflow="scroll">
            {products}
          </Grid>
        )
    }
}

function ProductInCart(props) {
  return(
    <Grid item>  
      <Grid container>
        <Grid item>
          <ButtonBase sx={{ width: 70, height: 70, paddingRight:2}}>
            <Img alt="complex" src={props.path}/>
          </ButtonBase>
        </Grid>
        <Grid item xs sm container direction="column">
          <Grid item container direction="row" 
                justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div" margin={0}>
                {props.name}
              </Typography>
            </Grid>
            <Grid>
              <IconButton aria-label="delete"
                          onClick={() => {props.deletProductFromCart(props)}}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="caption" component="div" sx={{color:'grey'}}>
              {props.coast} за кг
            </Typography>
          </Grid>
          <Grid item xs container alignItems='end'>
            <Grid item container direction="row" 
                  justifyContent={"space-between"} alignItems={"center"}
                  sx={{paddingRight:1}}>
              <Stack xs={7} spacing={1} direction="row" alignItems={"center"}>
                <Button onClick={()=> {props.chanegCount(props,false)}} 
                        variant='text' size='small'
                        sx={{minWidth:15}} >
                -</Button>
                <TextField value={props.count} sx={{width: '3ch', "& fieldset": { border: 'none' }}} 
                           inputProps={{style:{padding:0, textAlign:"center"}}}
                           onChange={(e) => {props.handleChangeCount(props,e.target.value)}}
                           onBlur={() => {props.editCount(props)}}
                />
                <Button onClick={() => {props.chanegCount(props,true)}} 
                        variant='text' size='small' 
                        sx={{minWidth:15}}>
                +</Button>
              </Stack>
              <Grid item xs={5} sx={{textAlign:'end'}}>
                <Typography variant="subtitle2" component="div">
                  {props.sum} $
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

class ShoppingCart extends React.Component {
  round(a){
    return Math.round((a+Number.EPSILON)*100)/100
  }

  render() {  
    const products = this.props.cart.map((product) =>
          <ProductInCart
            key={product.id}
            name={product.name}
            path={product.path}
            coast={product.coast} 
            count={product.count}
            sum={this.round(product.coast*product.count)}
            chanegCount={(product,isAdd) => this.props.chanegCount(product,isAdd)}
            deletProductFromCart={() => this.props.deletProductFromCart(product)}
            handleChangeCount={(product,number) => this.props.handleChangeCount(product,number)}
            editCount={product => this.props.editCount(product)}
          />
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
                    sx={{width:'100%', bottom:0, position: "absolute", bottom: 0, borderRadius:0,
                    display:sum==0 ? 'none' : 'block'}}>
              Оплатить {sum}$
            </Button>
          </Drawer>
        </>
      )
    }else{
      return (
        <div sx={{position:"absolute", right:0}}>
          <Typography variant='h5' color='green'>Корзина</Typography>
          <Grid container direction='column' overflow="scroll" wrap='nowrap' 
                sx={{marginBottom:'36px','&::-webkit-scrollbar': {width: 0}}}>
            {products}
            <Button variant="contained" 
                    sx={{display:sum==0 ? 'none' : 'block'}}>
              Оплатить {sum}$
            </Button>
          </Grid>
       </div>
      )
    }   
  }
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
        },
        {
          id: '#31',
          name:'Potato1',
          path: "images/products/potato.jpeg",
          coast: 1.99,
          count: 0,
        },
        {
          id: '#41',
          name:'Cucumber1',
          path: "images/products/cucumber.jpeg",
          coast: 2.49,
          count: 0,
        },
        {
          id: '#51',
          name:'Broccoli1',
          path: "images/products/broccoli.jpeg",
          coast: 21.99,
          count: 0,
        },
        {
          id: '#61',
          name:'Onion1',
          path: "images/products/onion.jpeg",
          coast: 0.99,
          count: 0,
        },
        {
          id: '#71',
          name:'Pumpkin1',
          path: "images/products/pumpkin.jpeg",
          coast: 11.49,
          count: 0,
        },
        {
          id: '#32',
          name:'Potato2',
          path: "images/products/potato.jpeg",
          coast: 1.99,
          count: 0,
        },
        {
          id: '#42',
          name:'Cucumber2',
          path: "images/products/cucumber.jpeg",
          coast: 2.49,
          count: 0,
        },
        {
          id: '#52',
          name:'Broccoli2',
          path: "images/products/broccoli.jpeg",
          coast: 21.99,
          count: 0,
        },
        {
          id: '#62',
          name:'Onion2',
          path: "images/products/onion.jpeg",
          coast: 0.99,
          count: 0,
        },
        {
          id: '#72',
          name:'Pumpkin2',
          path: "images/products/pumpkin.jpeg",
          coast: 11.49,
          count: 0,
        }
        ],
      cart: [],
      cartIsVisible: false,
      width:0,
      scroll:0,
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

    const cart = (product.count === 1 && !isAdd)
                ? this.state.cart.filter(p => p.name !== product.name)
                : this.state.cart.map(p =>
                      p.name === product.name
                      ? {...p, count: p.count+number} 
                      : p) 

    this.setState({
      cart: cart,
      products: products
    })
  }

  handleChangeCount(product, number) {
    const products = this.state.products.map(p =>
      p.name === product.name
        ? {...p, count: number} 
        : p)
    
    const cart = this.state.cart.map(p =>
                      p.name === product.name
                      ? {...p, count: number} 
                      : p)    

    this.setState({
      cart: cart,
      products: products
    })
  }

  editCount(product){
    const n = product.count>0  ? product.count : 1
   
    const products = this.state.products.map(p =>
      p.name === product.name
        ? {...p, count: n} 
        : p)
    
    const cart = this.state.cart.map(p =>
                      p.name === product.name
                      ? {...p, count: n} 
                      : p)    

    this.setState({
      cart: cart,
      products: products
    })
  }

  deletProductFromCart(product){
    const products = this.state.products.map(p =>
      p.name === product.name
        ? {...p, count: 0} 
        : p)

    const cart = this.state.cart.filter(p => p.name !== product.name)
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
      <Grid item xs={12} lg={8}>
        <ProductList products={this.state.products}
                    onClick={product => this.handleClick(product)}
                    chanegCount={(product,isAdd) => this.chanegCount(product,isAdd)}
        />
        </Grid>
        <Grid item md={4}>
        <ShoppingCart cart={this.state.cart}
                      isVisible={this.state.cartIsVisible}
                      onClick={cartIsVisible => this.showCart(cartIsVisible)}
                      chanegCount={(product,isAdd) => this.chanegCount(product,isAdd)}
                      deletProductFromCart={product => this.deletProductFromCart(product)}
                      handleChangeCount={(product,number) => this.handleChangeCount(product,number)}
                      editCount={product => this.editCount(product)}
        />
        </Grid>
      </Grid>
    </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Shop/>);


//адаптивнфе размеры шрифтов и отступов (не было измерения в абсолытных е.и.)
//рефакторинг
//скролинг корзины