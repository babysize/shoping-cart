import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectorCountOfProduct from '../SelectorCountOfProduct/SelectorCountOfProduct';
import useStyles from './ProductInCart.style';

function ProductInCart(props) {
  const {classes} = useStyles()

  return(
    <Grid item>  
      <Grid container>
        <Grid item>
          <ButtonBase className={classes['container_img']}>
            <img alt="complex" src={props.product.path} className={classes.img}/>
          </ButtonBase>
        </Grid>
        <Grid item xs sm container direction="column">
          <Grid item container className={classes['container_space-btw_center_row']}>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div" margin={0}>
                {props.product.name}
              </Typography>
            </Grid>
            <Grid>
              <IconButton aria-label="delete"
                          onClick={() => {props.deletProductFromCart(props.product.id)}}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="caption" component="div" className={classes.description}>
              {props.product.coast} за кг
            </Typography>
          </Grid>
          <Grid item xs container alignItems='end'>
            <Grid item container className={classes['container_space-btw_center_row']}>  
              <SelectorCountOfProduct
                product={props.product}
                changeCountByOne={(id,count,isAdd) => props.changeCountByOne(id,count,isAdd)}>
              </SelectorCountOfProduct>
              <Grid item xs={5} className={classes['container_sum-coast']}>
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

export default ProductInCart;