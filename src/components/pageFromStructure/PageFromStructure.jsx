import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/backendService';
import Loader from '../loader/Loader';

import './pageFromStructure.scss';

const PageFromStructure = ({obj}) => {
     const [isLoading, setIsLoading] = useState(false);
     const deletePage = async(event, id) => {
          event.preventDefault();
          axios.post(`/page/nested/delete/${id}`, null, {
               headers: {
                    Authorization: localStorage.getItem('token')
               }
          })
     }

     const incrementOrderOfPage = async(event, id) => {
          event.preventDefault();
          setIsLoading(true);
          await axios.post(`/page/increment/${id}`, null, {
               headers: {
                    Authorization: localStorage.getItem('token')
               }
          })
          .finally(() => setIsLoading(false));
     }

     const decrementOrderOfPage = async(event, id) => {
          event.preventDefault();
          setIsLoading(true);
          await axios.post(`/page/decrement/${id}`, null, {
               headers: {
                    Authorization: localStorage.getItem('token')
               }
          })
          .finally(() => setIsLoading(false));
          
     }


     return (
          <>
               <div className="structure__link">
                    <h6>{obj.title.ru}</h6>
                    {
                         obj.isNested ? (
                              <div className="blog__item-links">
                                   <Link 
                                        to={`/create/nested/${obj._id}`}
                                        className="blog__item-links-item">
                                             <i className="fa-solid fa-plus"></i>
                                             Добавить вложенную страницу
                                   </Link>
                              </div>
                         ) : (
                              <Link
                                   to={`/edit/${obj._id}`}
                                   className="structure__link-btn">
                                        Редактировать
                              </Link>
                         )
                    }
               </div>
               {
                    obj.isNested && (
                         <div className="structure__links">
                              {
                                   isLoading ? (
                                        <Loader height={240}/>
                                   ) :
                                   obj.nestedPages.map((item, idx) => (
                                        <div key={item._id} className="structure__links-item">
                                             <h6>{item.title.ru}</h6>
                                             <div className="blog__item-links">
                                                  <Link to={`/edit/${item._id}`}
                                                       className="blog__item-links-item">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                            Редактировать
                                                  </Link>
                                                  
                                                  {
                                                       (item._id !== '641c9dd0812f801bbb67cec3' && item._id !== '641c9e22812f801bbb67d0f6') && (
                                                            <>
                                                                 <Link to={`http://localhost:3000/${item.link}`}
                                                                      rel="noopener noreferrer"
                                                                      target="_blank"
                                                                      className="blog__item-links-item">
                                                                           <i className="fa-solid fa-link"></i>   
                                                                           Открыть
                                                                 </Link>
                                                                 <form onSubmit={(e) => deletePage(e, item._id)}>
                                                                      <button 
                                                                           type="submit"
                                                                           className="blog__item-links-item">
                                                                                <i className="fa-solid fa-trash"></i>
                                                                                Удалить
                                                                      </button>
                                                                 </form>
                                                                 <div className="blog__item-links-order">
                                                                 {
                                                                      idx !== 0 && (
                                                                           <form 
                                                                                onSubmit={(e) => incrementOrderOfPage(e, item._id)}>
                                                                                <button 
                                                                                     type="submit"
                                                                                     className="blog__item-links-item">
                                                                                          <i class="fa-solid fa-arrow-up-long"></i>
                                                                                          Вверх
                                                                                </button>
                                                                           </form>
                                                                      )
                                                                 }
                                                                 {
                                                                      idx + 1 !== obj.nestedPages.length && (
                                                                           <form 
                                                                                onSubmit={(e) => decrementOrderOfPage(e, item._id)}>
                                                                                <button 
                                                                                     type="submit"
                                                                                     className="blog__item-links-item">
                                                                                          <i class="fa-solid fa-arrow-down-long"></i>
                                                                                          Вниз
                                                                                </button>
                                                                           </form>
                                                                      )
                                                                 }       
                                                                 </div>
                                                                                                                        
                                                            </>
                                                       
                                                       )
                                                  }
                                                 
                                             </div>
                                        </div>
                                   ))
                              }
                         </div>
                    )
               }
               
          </>
     )
}

export default PageFromStructure;