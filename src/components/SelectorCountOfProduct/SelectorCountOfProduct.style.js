import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    {
      'button': {
        border:"0px",
        ":hover":{
            border:"0px",
        }
      },
      'text_count-product': {
        paddingLeft:2, 
        paddingRight:2
      }
    })

export default useStyles