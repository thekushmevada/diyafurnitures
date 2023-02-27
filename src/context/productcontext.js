import { createContext } from "react";
import { useContext } from 'react'

const AppContext = createContext();

const AppProvider = ({children}) => {
    return <AppContext.Provider value={{myName : "kush is OP"}}>
        {children}
    </AppContext.Provider>
};

//custom hooks
// custom hook
const useProductContext = () => {
    return useContext(AppContext);
  }

export {AppProvider , AppContext, useProductContext};