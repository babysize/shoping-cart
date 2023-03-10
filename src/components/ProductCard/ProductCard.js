import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SelectorCountOfProduct from '../SelectorCountOfProduct/SelectorCountOfProduct';
import useStyles from './ProductCard.style';

function ProductCard(props) {
  const { classes } = useStyles()

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item>
            <ButtonBase className={classes['container-img']}>
              <img alt="complex" src={props.product.path} className={classes.img}/>
            </ButtonBase>
          </Grid>
          <Grid item xs sm container direction="column">
            <Grid item xs container direction="row">
              <Grid item xs={7}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {props.product.name}
                </Typography>
              </Grid>
              <Grid item xs={5} className={classes['container-coast']}>
                <Typography variant="subtitle1" component="div">
                  {props.product.coast} $
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container alignItems='end'>
              {
                  props.product.count == 0
                ? <Grid item>
                    <IconButton onClick={() => { props.addNewProductInCart(props) }}
                                color="primary" 
                                aria-label="add to shopping cart">
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Grid>
                : <Grid item>
                    <SelectorCountOfProduct
                      product={props.product}
                      changeCountByOne={(id, count, isAdd) => props.changeCountByOne(id, count, isAdd)}>
                    </SelectorCountOfProduct>
                  </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ProductCard;