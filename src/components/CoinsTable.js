import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { CoinList } from '../config/api';
import Pagination from '@material-ui/lab/Pagination';
import { useNavigate } from 'react-router-dom';
import { CurrencyState } from '../Context';



const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#5CDB95",
      },
    },
    pagination: {
        "& .MuiPaginationItem-root": {
          color: "#5CDB95",
        },
      },
  });
const CoinsTable = () => {

   

      const classes = useStyles();

    const [coins,setCoins] =useState([]);
    const [loading ,setLoading] = useState(false);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);

    const { currency, symbol } = CurrencyState();
    const navigate = useNavigate();

    const fetchCoins = async ()=> {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    console.log(coins);
    useEffect(()=>{
        fetchCoins();
    },[currency])


    const handleSearch = ()=> {

        return coins.filter((item) => item.name.toLowerCase().includes(search));
    }

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

<Container style = {{textAlign: "center"}}> 
<Typography variant  = "h4" style = {{margin :18}}>Coin by Market cap</Typography>
<TextField  label = "seach for coins" variant = "outlined" style = {{width:"100%",marginBottom:20}} onChange = {(e)=> setSearch(e.target.value)}/>

<TableContainer>
    {loading ? (<LinearProgress style = {{backgroundColor : "#5CDB95"}}/>) : (
        <Table>
            <TableHead style= {{backgroundColor : "#5CDB95"}}>
            <TableRow>
              {['Coin','Price','24h Change','Market Cap'].map((head) => (
                <TableCell
                style = {{
                    color : "black",
                    fontWeight: "700",

                }}
                  key={head}
                  
                  
                >
                 {head}
                </TableCell>
              ))}
            </TableRow>
            </TableHead>
            <TableBody>
          {handleSearch().slice((page - 1) * 5, (page - 1) * 5 + 5).map((row) => (
            
            <TableRow onClick = {()=> navigate(`/coins/${row.id}`)} key={row.name}>
              <TableCell  component="th" scope="row" style = {{display: "flex", gap :15}}>
                  <img src = {row.image} height = "50"  style = {{marginBottom : 10}}/>
                    {/* <span>₹</span> */}
                    <div style = {{display: "flex", flexDirection :"column"}}>
                        <span style = {{textTransform : "uppercase", fontSize :12}}>{row.symbol}</span>
                        <span>{row.name}</span>
                    </div>
              </TableCell>
              <TableCell ><span>{symbol}</span>{row.current_price}</TableCell>
              <TableCell style = {{color : row.market_cap_change_percentage_24h > 0 ? "green": "red"}}>{row.market_cap_change_percentage_24h.toFixed(2)}%</TableCell>
              <TableCell><span>{symbol}</span>{row.market_cap.toString().slice(0, -6)}M</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    )}
</TableContainer>

            <Pagination count={(coins?.length / 5).toFixed(0)}
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              classes={{ ul: classes.pagination }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            shape="rounded" />
</Container>

        </ThemeProvider>
  )
}

export default CoinsTable