import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import PageFromStructure from '../../components/pageFromStructure/PageFromStructure';
import axios from '../../services/backendService';

import './structurePage.scss';

const StructurePage = () => {
     const decoded = jwtDecode(localStorage.getItem('token'));
     if ((decoded.exp + 18000000) > Date.now()) {
          <Navigate to='/login'/>
     }
     const [isLoading, setIsLoading] = useState(true);
     const [pages, setPages] = useState([]);
     useEffect(() => {
          axios.get('/page/parent/')
               .then(res => setPages(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, [pages]);
     return (
          <div className="structure">
               <div className="section__title">Структура сайта</div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
                         pages.length > 0 && pages.map((obj) => (
                              <PageFromStructure key={obj._id} obj={obj}/>
                         ))
                    )
               }
          </div>
     )
}

export default StructurePage;