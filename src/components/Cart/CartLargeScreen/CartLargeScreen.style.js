import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    {
      'container': {
        position:"absolute",
        width:'-webkit-fill-available',
        paddingRight:'1em'
      },
      'visible': {
        display:"block"
      },
      'invisible': {
        display:"none"
      }
    })

export default useStyles