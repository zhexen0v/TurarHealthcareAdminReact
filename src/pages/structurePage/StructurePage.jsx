import { useState, useEffect } from 'react';

import PageFromStructure from '../../components/pageFromStructure/PageFromStructure';
import axios from '../../services/backendService';

import './structurePage.scss';

const StructurePage = () => {
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