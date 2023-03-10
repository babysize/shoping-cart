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
import useStyles from './CartSmallScreen.style';
import classNames from 'classnames';

function CartSmallScreen(props) {
    const {classes} = useStyles()

    return (
        <>
            <Fab onClick={() => props.onClick(props.isVisible)}
                 className={classes['icon-button']}
                 color="primary" aria-label="open shopping cart" size="large">
                <Badge badgeContent={props.countProducts} color="primary">
                    <ShoppingBasketOutlinedIcon />
                </Badge>
            </Fab>
            <Drawer anchor='right'
                    open={props.isVisible}
                    onClose={() => props.onClick(props.isVisible)}
                    PaperProps={{ sx: { width: { xs: '100%', sm: '50%' } } }}>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' color='green' margin={2}>Корзина</Typography>
                    <IconButton onClick={() => props.onClick(props.isVisible)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Grid container direction='column' p={1}
                      className={classes['container-products']}
                      overflow="scroll" wrap='nowrap'>
                      {props.products}
                </Grid>
                <Button variant="contained"
                        className={classNames(classes['button-pay'], props.sum == 0 ? classes.invisible : classes.visible)}>
                    Оплатить {props.sum}$
                </Button>
            </Drawer>
        </>
    )
}

export default CartSmallScreen