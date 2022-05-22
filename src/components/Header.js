import { AppBar, Container, createTheme, makeStyles, MenuItem, NativeSelect, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import SelectInput from '@material-ui/core/Select/SelectInput'
import React from 'react';
import { useNavigate } from "react-router-dom";
import {CurrencyState} from '../Context';



const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "#5CDB95",
        fontFamily: 'Helvetica',
        fontWeight: "bold",
        cursor: "pointer",
    },
}))
function Header() {


    const classes = useStyles();
    const navigate = useNavigate();

    const {currency,setCurrency} = CurrencyState();


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });


    return (
        <ThemeProvider theme={darkTheme}>

            <AppBar color='transparent' position='static' >

                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')} className={classes.title} >Coin Market</Typography>
                        <Select value={currency} variant="outlined"
                             onChange={(e) => setCurrency(e.target.value)}
                            labelId="demo-simple-select-label"
                            style={{ width: 100, height: 40, marginLeft: 15 }}>
                            <MenuItem value = {"USD"}>USD</MenuItem>
                            <MenuItem   value = {"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>

                </Container>

            </AppBar>
        </ThemeProvider>
    )
}

export default Header