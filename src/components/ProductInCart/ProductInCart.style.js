import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    {
      'img': {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      'container_img': {
        width: 70, 
        height: 70, 
        paddingRight: '1em'
      },
      'description': {
        color:'grey'
      },
      'container_sum-coast': {
        textAlign:'end'
      },
      'container_space-btw_center_row': {
        direction:'row',
        justifyContent:"space-between",
        alignItems:"center"
      }
    })

export default useStyles