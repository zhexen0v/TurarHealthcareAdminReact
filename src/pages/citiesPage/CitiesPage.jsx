import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from '../../services/backendService';

import CityLinks from "../../components/cityLinks/CityLinks";

const CitiesPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [cities, setCities] = useState([]);
     const [deleted, setDeleted] = useState(false);
     useEffect(() => {
          setDeleted(false);
          axios.get('/city/all')
               .then(res => setCities(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, [deleted]);
     return (
          <div className="blog">
               <div className="blog__wrapper">
                    <h3 className="section__title">Города</h3>
                    <Link to='/cities/create' className="blog__btn">Добавить город</Link>
               </div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
                         <>
                              {
                                   cities.map(obj => (
                                        <CityLinks 
                                             key={obj._id}
                                             title={obj.name.ru}
                                             id={obj._id}
                                             link={obj.link}
                                             setArticleDeleted={setDeleted}/>
                                   ))
                              }
                         </>
                    )
               }
          </div>
     )
}

export default CitiesPage;