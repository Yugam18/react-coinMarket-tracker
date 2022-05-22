import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';


import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Chart, registerables } from 'chart.js';
import { CurrencyState } from '../Context';
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  btnStyle: {
    border: "1px solid #5CDB95",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: "#5cdb95",
    color: "black",
    fontWeight: 500,
  }
}));

export const CoinInfo = ({ coin }) => {

  const [historical, setHistorical] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  const {currency,symbol} =CurrencyState();


  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days,currency));
    setFlag(true);
    setHistorical(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days,currency]);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container} >
        {!historical ? (
          <CircularProgress style={{ backgroundColor: "#5CDB95" }} thickness={1} />
        ) :
          (
            <>
              <Line data={{
                labels: historical.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days == 1 ? time : date.toLocaleDateString();

                }),

                datasets: [
                  {
                    data: historical.map((coin) => coin[1]),
                    label: `Price in  Past ${days} Days in {currency}`,
                    borderColor: "#5CDB95"
                  },
                ]

              }}
                options={
                  {
                    elements: {
                      point: {
                        radius: 1,
                      }
                    },
                  }
                }
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, width: '100%' }}>
                <button onClick={() => { setDays(1) }} className={classes.btnStyle}>1 Day</button>
                <button onClick={() => { setDays(30) }} className={classes.btnStyle}> 30 Days</button>
                <button onClick={() => { setDays(365) }} className={classes.btnStyle}>365 Days</button>
              </div>
            </>
          )
        }

      </div>
    </ThemeProvider>
  )
}
