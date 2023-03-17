import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { Login } from './pages/user/Login';
import { Register } from './pages/user/Register';
import { Home } from './pages/Home.js';
import { ResponsiveAppBar } from './navBar';
import { Outlet } from 'react-router-dom';
import { CreateArea } from './pages/createArea/createArea';
import { AreaList } from './pages/AreaLIst/AreaList';
import { ChooseService } from './pages/createArea/chooseService';
import { ChooseActionReaction } from './pages/createArea/chooseActionReaction';
import { Account } from './pages/account/Account';
import { ServicesSettingsAccount } from './pages/account/ServicesSettingsAccount';

function WithNav() {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
        </>
    )
}

function WithoutNav() {
    return (
        <Outlet />
    )
}

const Adresse = "area.hik-up.fr"
export default Adresse

export function App() {
    const location = useLocation();
    const [token, setToken] = useState(null);

    if (!token && location.pathname !== "/login" && location.pathname !== "/register") {
        return <Login setToken={setToken}/>
    }
  return (
      <div className="App">
          <Routes>
              <Route element={<WithoutNav />}>
                  <Route path="/login" element={<Login setToken={setToken} />}/>
                  <Route path="/register" element={<Register/>}/>
              </Route>
              <Route element={<WithNav />}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/CreateArea" element={<CreateArea/>}/>
                  <Route path="/AreaList" element={<AreaList/>}/>
                  <Route path="/CreateArea/ChooseService" element={<ChooseService/>}/>
                  <Route path="/CreateArea/ChooseService/ChooseActionReaction" element={<ChooseActionReaction/>}/>
                  <Route path="/Account" element={<Account/>}/>
                  <Route path="/Account/ServicesSettings" element={<ServicesSettingsAccount/>}/>
              </Route>
          </Routes>
      </div>
  );
}



