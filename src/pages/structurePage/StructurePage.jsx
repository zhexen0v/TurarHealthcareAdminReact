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
     }, []);
     return (
          <div className="structure">
               {
                    isLoading ? (
                         <h2>Loading...</h2>
                    ) : (
                         pages.length > 0 && pages.map((obj) => (
                              <PageFromStructure obj={obj}/>
                         ))
                    )
               }
          </div>
     )
}

export default StructurePage;