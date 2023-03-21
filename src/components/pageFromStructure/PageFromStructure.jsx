import { Link } from 'react-router-dom';
import axios from '../../services/backendService';

import './pageFromStructure.scss';

const PageFromStructure = ({obj}) => {
     const deletePage = async(event, id) => {
          event.preventDefault();
          axios.post(`/page/nested/delete/${id}`, null, {
               headers: {
                    Authorization: localStorage.getItem('token')
               }
          })
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
                                   obj.nestedPages.map((item) => (
                                        <div key={item._id} className="structure__links-item">
                                             <h6>{item.title.ru}</h6>
                                             <div className="blog__item-links">
                                                  <Link to={`/edit/${item._id}`}
                                                       className="blog__item-links-item">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                            Редактировать
                                                  </Link>
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
                                             </div>
                                             {/* <Link
                                                  to={`/edit/${item._id}`}
                                                  className="structure__links-item-btn">
                                                       Редактировать
                                             </Link> */}
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