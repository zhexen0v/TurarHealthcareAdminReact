// import jwtDecode from 'jwt-decode';
// import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import SidebarLink from './components/sidebarLink/sidebarLink';
import GeneralPage from './pages/generalPage/GeneralPage';

import './App.scss';
import LoginPage from './pages/loginPage/loginPage';

function App() {
     //const [isAuth, setIsAuth] = useState(false);
     const location = useLocation();
     // const decoded = jwtDecode(localStorage.getItem('token'));
     // if ((decoded.exp + 18000000) < Date.now()) {
     //      setIsAuth(true);
     // }
     return (
               <div className="main__wrapper">
                    {
                         location.pathname !== '/login' && (
                              <div className="main__sidebar">
                                   <SidebarLink link="/general" name="Общая информация"/>
                              </div>
                         )
                    }

                    <div className="main__content">
                         <Routes>
                              <Route path='/login' element={<LoginPage/>}/>
                              <Route path='/general' element={<GeneralPage/>}/>
                         </Routes>
                    </div>
               </div>
     )
}

export default App;
