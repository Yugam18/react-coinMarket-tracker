import React, { createContext, useContext } from 'react'

const Crypto =  createContextContext()

const cryptoContext = ({children}) => {
  return <Crypto.Provider>
      {children}
  </Crypto.Provider>
   
};

export default cryptoContext


export const CryptoState =()=> {
    useContext(Crypto);
}