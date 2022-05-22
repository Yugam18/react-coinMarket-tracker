import {createContext, useContext, useEffect, useState} from 'react';

const currencyContext =  createContext()

const Context = ({children}) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");


    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
      }, [currency]); 


  return (
        <currencyContext.Provider value={{ currency, setCurrency, symbol }}>
            {children}
        </currencyContext.Provider>
  )
}

export default Context;

export const CurrencyState = () => {
    return useContext(currencyContext);
  };