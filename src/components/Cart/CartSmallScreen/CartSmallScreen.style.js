import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    {
      'icon-button': {
        position: 'fixed', 
        bottom: 20, 
        right: 20 
      },
      'container-products': {
        marginBottom: '30px', 
        '&::-webkit-scrollbar': { width: 0 }
      },
      'button-pay': {
        width: '100%', 
        position: "absolute", 
        bottom: 0, 
        borderRadius: 0
      },
      'visible': {
        display:"block"
      },
      'invisible': {
        display:"none"
      }
    })

export default useStyles