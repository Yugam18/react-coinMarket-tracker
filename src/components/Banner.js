import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { CurrencyState } from '../Context';
import Carousel from './Carousel';



const useStyles = makeStyles(() => ({

    banner : {
        backgroundImage : 'url(./space.jpg)'
    },
    bannerContent : {
        height:400,
        display : "flex",
        flexDirection : "column",
        paddingTop: 25,
        justifyContent : "space-around"
    },
    tagLine: {
        height:'50%',
        display :"flex",
        flexDirection : "column",
        justifyContent : "center",
        textAlign : "center"
    }
}))

const Banner = () => {

    const classes = useStyles();

 

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className = {classes.tagLine}>
                    <Typography variant = "h4" style = {{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Helvetica"
                    }}>

                    Ge all crypto info at one place
                    </Typography>
            </div>

                 <Carousel />

        </Container>
    </div>
  )
}

export default Banner