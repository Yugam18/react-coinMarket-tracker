import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CoinInfo } from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CurrencyState } from '../Context';

const useStyles = makeStyles(()=>({
    container: {
        display: "flex",
      },
      sidebar: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
      },
    }));

function CoinPage() {
    const {id}  = useParams();
    const [coin,setCoin] = useState();

    const classes = useStyles();
    const fetchCoin = async()=> {
        const {data} = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    const { currency, symbol } = CurrencyState();

    useEffect(() => {
        fetchCoin();
    },[])

    if (!coin) return <LinearProgress style={{ backgroundColor: "#5CDB95"}} />;

  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        
        <Typography className= {classes.heading} variant="h3" >{coin.name}</Typography>

        <div className={classes.marketData}>
          <span style= {{display:'flex'}}>
            <Typography style = {{fontSize: 20}} variant = "h5" >Rank:</Typography>&nbsp;&nbsp;&nbsp;&nbsp;
            <Typography  style = {{fontSize: 20}} variant = "h5">{coin.market_cap_rank}</Typography>
          </span>
          <span style= {{display:'flex',alignItems: 'center'}}>
            <Typography style = {{fontSize: 20}} variant = "h5" >Current Price:</Typography>&nbsp;&nbsp;&nbsp;&nbsp;
            <Typography variant = "h5">{symbol}{coin?.market_data.current_price[currency.toLowerCase()]}</Typography>
          </span>
        </div>

        </div>
        <CoinInfo coin = {coin}/>
    </div>

  )
}

export default CoinPage