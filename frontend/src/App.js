// import logo from './logo.svg';
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {Nav,WithSubnavigation} from "./components/Navbar";
import { useEffect, useState } from "react";
import AllRoutes from "./Allrouts/Allrouts";
// import ArticleList from "./components/Body";
function App() {
  let [token,setToken]=useState(false)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(true)
    }else{
      setToken(false)
    }
  })
  return (
    <ChakraProvider>
      <div className="App">
        {token ?<Nav setToken={setToken}  />: <WithSubnavigation />}
        <AllRoutes />
      </div>
    </ChakraProvider>
  );
}

export default App;
