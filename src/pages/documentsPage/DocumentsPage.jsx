import { useState, useEffect } from 'react';
import axios from '../../services/backendService';

import AddOrUpdateDocumentCategoryForm from '../../components/addOrUpdateDocumentCategoryForm/AddOrUpdateDocumentCategoryForm';
import ItemFromDocumentCategory from '../../components/itemFromDocumentCategory/ItemFromDocumentCategory';

import './documentsPage.scss';

const DocumentsPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(null);
     const [documents, setDocuments] = useState([]);
     const [toggleModal, setToggleModal] = useState(false);

     const handleClickSetOppositeToogleModal = () => {
          setToggleModal(!toggleModal);
     }


     useEffect(() => {
          axios.get('/document/category')
               .then(res => setDocuments(res.data))
               .catch(err => setError(err))
               .finally(() => setIsLoading(false));
     }, [documents]);
     return (
          <div className="documents">
               <AddOrUpdateDocumentCategoryForm  
                         toggle={toggleModal}
                         handleFunction={handleClickSetOppositeToogleModal}
                         isUpdating={false}/>
               <div className="documents__wrapper">
                    <div className="section__title">Внутренние документы</div>
                    <div 
                         className="documents__btn"
                         onClick={handleClickSetOppositeToogleModal}>Добавить категорию внутренних документов
                    </div>
               </div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : error ? (
                         <h2>{error}</h2>
                    ) : (
                         documents.length > 0 && (
                              documents.map(obj => (
                                   <ItemFromDocumentCategory key={obj._id} obj={obj} categories={documents}/>
                              ))
                         )
                    )
               }
          </div>
     )
}
export default DocumentsPage;