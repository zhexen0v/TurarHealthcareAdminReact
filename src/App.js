import { Routes, Route, useLocation } from 'react-router-dom';

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
import DocumentsPage from './pages/documentsPage/DocumentsPage';

import './App.scss';     

function App() {
     const location = useLocation();
     return (
               <div className="main__wrapper">
                    {
                         location.pathname !== '/login' && (
                              <div className="main__sidebar">
                                   <SidebarLink link="/general" name="Общая информация"/>
                                   <SidebarLink link="/structure" name="Структура"/>
                                   <SidebarLink link="/blog" name="Пресс-центр"/>
                                   <SidebarLink link="/partners" name="Партнеры"/>
                                   <SidebarLink link="/internal-documents" name="Внутренние документы"/>
                              </div>
                         )
                    }

                    <div className="main__content">
                         <Routes>
                              <Route path='/login' element={<LoginPage/>}/>
                              <Route path='/general' element={<GeneralPage/>}/>
                              <Route path='/structure' element={<StructurePage/>}/>
                              <Route path='/edit/:id' element={<EditPage/>}/>
                              <Route path='/create/nested/:id' element={<CreateNestedPage/>}/>
                              <Route path='/blog' element={<BlogPage/>}/>
                              <Route path='/blog/create' element={<CreateArticlePage/>}/>
                              <Route path='/blog/:id' element={<UpdateArticlePage/>}/>
                              <Route path='/partners' element={<PartnerPage/>}/>
                              <Route path='/internal-documents' element={<DocumentsPage/>}/>
                         </Routes>
                    </div>
               </div>
     )
}

export default App;
