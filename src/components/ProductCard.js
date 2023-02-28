import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SelectorCountOfProduct from './SelectorCountOfProduct';

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
              <Img alt="complex" src={props.product.path}/>
            </ButtonBase>
          </Grid>
          <Grid item xs sm container direction="column">
            <Grid item xs container direction="row">
              <Grid item xs={7}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {props.product.name}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{textAlign:'end'}}>
                <Typography variant="subtitle1" component="div">
                  {props.product.coast} $
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container alignItems='end'>
              <Grid item>
                <IconButton onClick={()=>{props.addNewProductInCart(props)}} 
                            sx={{display: props.product.count? 'none' : 'block'}} 
                            color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{display: props.product.count? 'block' : 'none', p:1}}>
                <SelectorCountOfProduct
                    product={props.product}
                    changeCountByOne={(id,count,isAdd) => props.changeCountByOne(id,count,isAdd)}>
                </SelectorCountOfProduct>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </Grid>
    );
  }

  export default ProductCard;