import { Link } from 'react-router-dom';

import './blogLinks.scss';

const BlogLinks =({id, title, createdDate}) => {
     const showCorrectDateFormat = (dateStr) => {
          const date = new Date(dateStr);
          // const offset = date.getTimezoneOffset();
          // const newOffset = -(offset * 60 * 1000) + (6 * 60 * 60 * 1000);
          // date.setMinutes(newOffset / (60 * 1000));

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${getZero(day)}.${getZero(month)}.${getZero(year)} ${getZero(hour)}:${getZero(minutes)}`;
     }
     const getZero = (num) => (num > 9 ? ""+ num : "0"+num)
     return (
          <div className="blog__item">
               <div className="blog__part">
                    <h6 className="blog__item-title">{title}</h6>
                    <div className="blog__item-links">
                         <Link to={`/blog/${id}`}
                              className="blog__item-links-item">
                                   <i class="fa-regular fa-pen-to-square"></i>
                                   Редактировать
                         </Link>
                         <Link to={`http://localhost:3000/blog/${id}`}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="blog__item-links-item">
                                   <i class="fa-solid fa-link"></i>   
                                   Открыть
                         </Link>
                         <Link to={`/blog/delete${id}`}
                              className="blog__item-links-item">
                                   <i className="fa-solid fa-trash"></i>
                                   Удалить
                         </Link>
                    </div>
               </div>
               <div className="blog__part">
                    {showCorrectDateFormat(createdDate)}
               </div>
          </div>
     )
}

export default BlogLinks;