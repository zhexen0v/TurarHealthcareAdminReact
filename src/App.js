import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import decodeToken from 'jwt-decode';

import SidebarLink from './components/sidebarLink/sidebarLink';
import GeneralPage from './pages/generalPage/GeneralPage';
import LoginPage from './pages/loginPage/loginPage';
import StructurePage from './pages/structurePage/StructurePage';
import EditPage from './pages/editPage/EditPage';
import CreateNestedPage from './pages/createNestedPage/CreateNestedPage';
import BlogPage from './pages/blogPage/BlogPage';
import CreateArticlePage from './pages/createArticle/CreateArticlePage';
import UpdateArticlePage from './pages/updateArticlePage/UpdateArticlePage';
import PartnerPage from './pages/partnerPage/PartnerPage';
import CitiesPage from './pages/citiesPage/CitiesPage';
import CreateOrUpdateCity from './pages/CreateOrUpdateCity/CreateOrUpdateCity';
import ChairmanBlogPage from './pages/chairmanBlogPage/ChairmanBlogPage';

import './App.scss';     

function App() {
     const isTokenExpired = () => {
          const token = localStorage.getItem('token');
          if (!token) {
               return true;
          }
          const decodedToken = decodeToken(token);
          if (!decodedToken.exp) {
            return true;
          }
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
          const currentTime = Date.now();
          return expirationTime < currentTime;
     }
     const location = useLocation();

     return (
               <div className="main__wrapper">
                    <div className="main__sidebar">{
                         location.pathname !== '/login' && (
                              <>
                                   <SidebarLink link="/general" name="Общая информация"/>
                                   <SidebarLink link="/structure" name="Структура"/>
                                   <SidebarLink link="/blog" name="Пресс-центр"/>
                                   <SidebarLink link="/partners" name="Партнеры"/>
                                   <SidebarLink link="/cities" name="Города"/>
                                   <SidebarLink link="/chairman" name="Блог председателя"/>
                              </>
                         )
                    }</div>

                    <div className="main__content">
                         <Routes>
                              <Route path='/login' element={<LoginPage/>}/>
                              <Route path='/general' element={isTokenExpired() ? <Navigate to="/login"/> : <GeneralPage/>}/>
                              <Route path='/structure' element={isTokenExpired() ? <Navigate to="/login"/> : <StructurePage/>}/>
                              <Route path='/edit/:id' element={isTokenExpired() ? <Navigate to="/login"/> : <EditPage isPagePart={false}/>}/>
                              <Route path='/edit/pagepart/:id' element={isTokenExpired() ? <Navigate to="/login"/> : <EditPage isPagePart={true}/>}/>
                              <Route path='/create/nested/:id' element={isTokenExpired() ? <Navigate to="/login"/> : <CreateNestedPage/>}/>
                              <Route path='/create/pagepart/:id' element={isTokenExpired() ? <Navigate to="/login"/> : <CreateNestedPage isPagePart={true}/>}/>
                              <Route path='/blog' element={isTokenExpired() ? <Navigate to="/login"/> : <BlogPage/>}/>
                              <Route path='/blog/create' element={isTokenExpired() ? <Navigate to="/login"/> : <CreateArticlePage/>}/>
                              <Route path='/blog/:id' element={isTokenExpired() ? <Navigate to="/login"/> : <UpdateArticlePage/>}/>
                              <Route path='/partners' element={isTokenExpired() ? <Navigate to="/login"/> : <PartnerPage/>}/>
                              <Route path='/cities' element={isTokenExpired() ? <Navigate to="/login"/> : <CitiesPage/>}/>
                              <Route path='/cities/create' element={isTokenExpired() ? <Navigate to="/login"/> : <CreateOrUpdateCity isUpdating={false}/>}/>
                              <Route path='/cities/:link' element={isTokenExpired() ? <Navigate to="/login"/> : <CreateOrUpdateCity isUpdating={true}/>}/>
                              <Route path='/chairman' element={isTokenExpired() ? <Navigate to="/login"/> : <ChairmanBlogPage/>}/>
                              <Route path='/*' element={<Navigate to='/general'/>}/>
                         </Routes>
                    </div>
               </div>
     )
}

export default App;
