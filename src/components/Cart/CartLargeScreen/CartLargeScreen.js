import Button from '@mui/material/Button';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import useStyles from './CartLargeScreen.style';

function CartLargeScreen(props) {
    const {classes} = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant='h5' color='green'>Корзина</Typography>
            <Grid container direction='column' wrap='nowrap'>
              {props.products}
              <Button variant="contained" 
                      className={props.sum==0 ? classes.visible : classes.invisible}>
                Оплатить {props.sum}$
              </Button>
            </Grid>
          </div>
    )
}

export default CartLargeScreen