import { Link } from 'react-router-dom';

import axios from '../../services/BackendService';


const CityLinks =({id, title, setArticleDeleted, link}) => {

     const deleteCity = async (event) => {
          event.preventDefault();
          try {
               axios.post(`/city/delete/${id}`, null, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setArticleDeleted(true);
          } catch (error) {
               console.log(error);
          }
     }
     return (
          <div className="blog__item">
               <div className="blog__part">
                    <h6 className="blog__item-title">{title}</h6>
                    <div className="blog__item-links">
                         <Link to={`/cities/${link}`}
                              className="blog__item-links-item">
                                   <i className="fa-regular fa-pen-to-square"></i>
                                   Редактировать
                         </Link>
                         <Link to={`http://localhost:3000/city/${id}`}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="blog__item-links-item">
                                   <i className="fa-solid fa-link"></i>   
                                   Открыть
                         </Link>
                         <form onSubmit={(e) => deleteCity(e)}>
                              <button type="submit" className="blog__item-links-item">
                                   <i className="fa-solid fa-trash"></i>
                                        Удалить
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     )
}

export default CityLinks;