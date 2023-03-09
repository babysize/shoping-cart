import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

function SelectorCountOfProduct(props) {
  return (
    <ButtonGroup variant='outlined' size='small' >
      <Button className='decriment-button' 
              onClick={()=> {props.changeCountByOne(props.product.id,props.product.count,false)}}
              sx={{ borderColor:'white'}}>
        -
      </Button>
      <Typography className='count-product' variant="subtitle1" component="div" 
                  style={{paddingLeft:2, paddingRight:2}}>
        {props.product.count}
      </Typography>
      <Button className='incriment-button' 
              onClick={() => {props.changeCountByOne(props.product.id,props.product.count,true)}}
              sx={{ borderColor:'white'}}>
        +
      </Button>
  </ButtonGroup>
  )
}

export default SelectorCountOfProduct;