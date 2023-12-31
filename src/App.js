import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Pages/HomePage";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Basket } from "./Pages/Basket";
import { PersonalAccount } from "./Pages/PersonalAccount";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/basket" element={ <Basket/> } />
        <Route path="/personal_account" element={ <PersonalAccount/> } />
      </Routes>
    </>
  );
}

export default App;
