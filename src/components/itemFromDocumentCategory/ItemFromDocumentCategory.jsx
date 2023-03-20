import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddOrUpdateDocumentCategoryForm from '../addOrUpdateDocumentCategoryForm/AddOrUpdateDocumentCategoryForm';
import AddOrUpdateDocumentForm from '../addOrUpdateDocumentForm/AddOrUpdateDocumentForm';

import './itemFromDocumentCategory.scss';


const ItemFromDocumentCategory = ({obj, categories}) => {
     const [toggleUpdateCategoryModal, setToggleUpdateCategoryModal] = useState(false);
     const [toggleAddDocumentModal, setToggleAddDocumentModal] = useState(false);
     const [toggleAccordion, setToggleAccordion] = useState(false);
     const handleClickSetOppositeToogleAccordion = () => {
          setToggleAccordion(!toggleAccordion);
     }
     const handleClickSetOppositeToogleUpdateCategoryModal = () => {
          setToggleUpdateCategoryModal(!toggleUpdateCategoryModal);
     }
     const handleClickSetOppositeToogleAddDocumentModal = () => {
          setToggleAddDocumentModal(!toggleAddDocumentModal);
     }
     return (
          <>
               <div className="document__item">
                    <div className="document__item-wrapper">
                         <div className="document__item-part">
                              <h6 className="document__item-title">{obj.title.ru}</h6>
                              <div className="document__item-link-list">
                                   <div
                                        onClick={handleClickSetOppositeToogleAddDocumentModal}
                                        className="document__item-link-item"
                                        >
                                             <i className="fa-solid fa-plus"></i>
                                             Добавить документ
                                   </div>
                                   <div
                                        onClick={handleClickSetOppositeToogleUpdateCategoryModal}
                                        className="document__item-link-item"
                                        >
                                             <i className="fa-regular fa-pen-to-square"></i>
                                             Редактировать
                                   </div>
                                   <Link to={`http://localhost:3000/internal-documents/${obj.link}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="document__item-link-item">
                                             <i className="fa-solid fa-link"></i>   
                                             Открыть
                                   </Link>
                                   <Link to={`/internal-documents/category/delete/${obj._id}}`}
                                        className="document__item-link-item">
                                             <i className="fa-solid fa-trash"></i>
                                             Удалить
                                   </Link>
                              </div>
                         </div>
                         <div className="document__item-part">
                              <div 
                                   className="document__item-toggle" 
                                   onClick={handleClickSetOppositeToogleAccordion}>
                                   <i className="fa-solid fa-caret-down"></i>
                              </div>
                         </div>
                    </div>
                    <AddOrUpdateDocumentForm
                         isUpdating={false}
                         toggle={toggleAddDocumentModal}
                         handleFunction={handleClickSetOppositeToogleAddDocumentModal}
                         currentCategory={obj._id}
                         categories={categories}/>
                    <AddOrUpdateDocumentCategoryForm 
                         obj={obj} 
                         toggle={toggleUpdateCategoryModal}
                         handleFunction={handleClickSetOppositeToogleUpdateCategoryModal}
                         isUpdating={true}/>
               </div>
               <div 
                    className="document__item-links"
                    style={toggleAccordion ? {'display': 'block'} : {'display':'none'}}>
                    {
                         obj.documents.length > 0 && (
                              obj.documents.map(item => (
                                   <div className="document__item-links-item">
                                        <h6 className="document__item-links-title">{item.name.ru}</h6>
                                        <div className="document__item-link-list">
                                             <Link to={`/internal-documents/category/update/${item._id}`} 
                                                  className="document__item-link-item"
                                                  >
                                                       <i className="fa-regular fa-pen-to-square"></i>
                                                       Редактировать
                                             </Link>
                                             <Link to={`http://localhost:4000/uploads/documents/${item.filename}`}
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                  className="document__item-link-item">
                                                       <i className="fa-solid fa-link"></i>   
                                                       Открыть
                                             </Link>
                                             <Link to={`/internal-documents/category/delete/${item._id}}`}
                                                  className="document__item-link-item">
                                                       <i className="fa-solid fa-trash"></i>
                                                       Удалить
                                             </Link>
                                        </div>
                                   </div>
                              ))
                         )
                    }
               </div>
          </>
     )
}

export default ItemFromDocumentCategory;