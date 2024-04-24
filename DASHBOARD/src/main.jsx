import React,{useState, createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



export const Context = createContext({isAuthenticated: false})

const AppWrapper = () =>{
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [user,setUser] = useState(false);

  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,setUser}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(

    <AppWrapper/>

)
