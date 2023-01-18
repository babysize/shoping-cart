import React from 'react';
import ReactDOM from 'react-dom/client';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid(props) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.path}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.name}
              </Typography>
            </Grid>
            <Stack direction="row" spacing={1}>
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {props.coast} $
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

// export default function FullWidthGrid() {
//     return (
//       <Box sx={{ flexGrow: 1 }}>
//         {props.cont}
//       </Box>
//     )
// }

class ProductList extends React.Component {
    constructor(props) {
      super(props)
        this.state = {
          products: [
            {
              name:'Carrot',
              path: "images/products/carrot.jpg",
              coast: 4.99,
              isAdd: false,
            },
            {
              name:'Tomato',
              path: "images/products/tomato.jpeg",
              coast: 9.49,
              isAdd: false,
            },
            {
              name:'Potato',
              path: "images/products/potato.jpeg",
              coast: 1.99,
              isAdd: false,
            },
            {
              name:'Cucumber',
              path: "images/products/cucumber.jpeg",
              coast: 2.49,
              isAdd: false,
            },
            {
              name:'Broccoli',
              path: "images/products/broccoli.jpeg",
              coast: 21.99,
              isAdd: false,
            },
            {
              name:'Onion',
              path: "images/products/onion.jpeg",
              coast: 0.99,
              isAdd: false,
            },
            {
              name:'Pumpkin',
              path: "images/products/pumpkin.jpeg",
              coast: 11.49,
              isAdd: false,
            }
          ]
        }
    }

    render() {
        const content = this.state.products.map((product) =>
          <ComplexGrid
            name={product.name}
            path={product.path}
            coast={product.coast}
            isAdd={product.isAdd}
          />
        )

        return (
            <div>
                {content}
            </div>
        )
        // return (
        //   <FullWidthGrid
        //     cont={content}
        //   />
        // )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProductList />);
