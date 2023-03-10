import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import useStyles from './SelectorCountOfProduct.style';
import classNames from 'classnames';

function SelectorCountOfProduct(props) {
  const {classes} = useStyles()

  return (
    <ButtonGroup variant='outlined' size='small' >
      <Button className={classNames(classes.button,'decriment-button')}
              onClick={()=> {props.changeCountByOne(props.product.id,props.product.count,false)}}>
        -
      </Button>
      <Typography className={classNames('count-product',classes['text_count-product'])} variant="subtitle1" component="div">
        {props.product.count}
      </Typography>
      <Button className={classNames(classes.button,'incriment-button')}//'incriment-button' 
              onClick={() => {props.changeCountByOne(props.product.id,props.product.count,true)}}>
        +
      </Button>
  </ButtonGroup>
  )
}

export default SelectorCountOfProduct;