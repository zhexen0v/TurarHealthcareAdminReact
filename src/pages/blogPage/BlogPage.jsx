import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../services/backendService';
import BlogLinks from '../../components/blogLinks/BlogLinks';

import './blogPage.scss';

const BlogPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [articles, setArticles] = useState([]);
     const [deleted, setDeleted] = useState(false);
     useEffect(() => {
          setDeleted(false);
          axios.get('/blog')
               .then(res => setArticles(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, [deleted]);
     return (
          <div className="blog">
               <div className="blog__wrapper">
                    <h3 className="section__title">Пресс-центр</h3>
                    <Link to='/blog/create' className="blog__btn">Добавить новость</Link>
               </div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
                         <>
                              {
                                   articles.map(obj => (
                                        <BlogLinks 
                                             title={obj.ru.title}
                                             id={obj._id}
                                             createdDate={obj.createdAt}
                                             setArticleDeleted={setDeleted}/>
                                   ))
                              }
                         </>
                    )
               }
          </div>
     )
}

export default BlogPage;