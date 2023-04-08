import { useState, useEffect } from 'react';
import axios from '../../services/BackendService';

import PageFromStructure from '../../components/pageFromStructure/PageFromStructure';

import './structurePage.scss';

const StructurePage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [pages, setPages] = useState([]);
     useEffect(() => {
          axios.get('/page/parent')
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