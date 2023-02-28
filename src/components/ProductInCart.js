import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectorCountOfProduct from './SelectorCountOfProduct';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function ProductInCart(props) {
  return(
    <Grid item>  
      <Grid container>
        <Grid item>
          <ButtonBase sx={{ width: 70, height: 70, paddingRight:2}}>
            <Img alt="complex" src={props.product.path}/>
          </ButtonBase>
        </Grid>
        <Grid item xs sm container direction="column">
          <Grid item container direction="row" 
                justifyContent="space-between" alignItems="center">
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
            <Typography gutterBottom variant="caption" component="div" sx={{color:'grey'}}>
              {props.product.coast} за кг
            </Typography>
          </Grid>
          <Grid item xs container alignItems='end'>
            <Grid item container direction="row" 
                  justifyContent={"space-between"} alignItems={"center"}
                  sx={{paddingRight:1}}>
              <SelectorCountOfProduct
                product={props.product}
                changeCountByOne={(id,count,isAdd) => props.changeCountByOne(id,count,isAdd)}>
              </SelectorCountOfProduct>
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

export default ProductInCart;