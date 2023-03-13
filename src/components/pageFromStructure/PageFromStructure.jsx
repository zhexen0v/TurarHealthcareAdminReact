import { Link } from 'react-router-dom';

import './pageFromStructure.scss';

const PageFromStructure = ({obj}) => {
     return (
          <>
               <div className="structure__link">
                    <h6>{obj.title.ru}</h6>
                    {
                         obj.isNested ? (
                              <Link
                                   to={`/create/nested/${obj._id}`}
                                   className="structure__link-btn">
                                        Добавить вложенную страницу
                              </Link>
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
                                        <div className="structure__links-item">
                                             <h6>{item.title.ru}</h6>
                                             <Link
                                                  to={`/edit/${item._id}`}
                                                  className="structure__links-item-btn">
                                                       Редактировать
                                             </Link>
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