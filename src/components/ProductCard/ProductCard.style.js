import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(
    {
      'paper': {
        padding: '0.5em',
        border: "1px solid",
        borderColor: '#cccccc'
      },
      'img': {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        paddingRight: '0.5em'
      },
      'container-img': {
        width: 100,
        height: 100
      },
      'container-coast': {
        textAlign: 'end',
      },
    })

export default useStyles