import { useState } from 'react';
import axios from '../../services/BackendService';

import InputBlock from "../inputBlock/inputBlock";

import './addOrUpdateDocumentForm.scss';

const AddOrUpdateDocumentForm = ({obj, isUpdating, pageId, isPagePart}) => {
     const [message, setMessage] = useState('');
     const [kzName, setKzName] = useState(isUpdating ? obj.name.kz : '');
     const [ruName, setRuName] = useState(isUpdating ? obj.name.ru : '');
     const [enName, setEnName] = useState(isUpdating ? obj.name.en : '');
     const [file, setFile] = useState(null);

     const deleteDocument = async (event) => {
          event.preventDefault();
          try {
               setMessage('Загрузка...');
               axios.post(`/document/delete/${obj._id}`, null, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setMessage('Удаление документа прошла успешно');
          } catch (error) {
               console.log(error);
               setMessage('Произошла ошибка во время удаление документа!');
          }
     }

     const updateDocumentData = async (event) => {
          event.preventDefault();
          try {
               setMessage('Загрузка...');

               const formData = new FormData();
               formData.append('file', file);
               formData.append('pageId', pageId);
               formData.append('ruName', ruName);
               formData.append('kzName', kzName);
               formData.append('enName', enName);
               const res = await axios.post(
                    isUpdating && isPagePart ? `/document/part/update/${obj._id}` : 
                    !isUpdating && isPagePart ? `/document/part/add` : 
                    isUpdating && !isPagePart ? `/document/update/${obj._id}` : 
                    '/document/add', 
                    formData, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setMessage(isUpdating ? 'Обновление данных прошло успешно!' : 'Загрузка документа прошло успешно!');
               console.log(res);
               if (!isUpdating) {
                    console.log('object');
                    setFile(null);
                    setRuName('');
                    setKzName('');
                    setEnName('');
               }
          } catch (error) {
               console.log(error);
               setMessage(isUpdating ? 'Произошла ошибка во время обновление данных!' : 'Произошла ошибка во время загрузки документа!');
          }
     }
     return (
          <form 
               className="document__item-form"
               style={isUpdating ? {'padding': '8px 12px', 'border-top': '1px solid #dcdcdc', 'marginTop':'0'} : {}}
               onSubmit={(e) => updateDocumentData(e)}>
               <div className="document__item-form-close">
                    <div className="section__title">{
                         !isUpdating && 
                         ('Добавление документа')
                    }</div>
               </div>
               <div className="document__item-form-wrapper">
                    <InputBlock
                         title="Название документа на русском языке"
                         name="name.ru"
                         value={ruName}
                         handleFunction={(e) => setRuName(e.target.value)}/>
                    <InputBlock
                         title="Название документа на казахском языке"
                         name="name.kz"
                         value={kzName}
                         handleFunction={(e) => setKzName(e.target.value)}/>
                    <InputBlock
                         title="Название документа на английском языке"
                         name="name.en"
                         value={enName}
                         handleFunction={(e) => setEnName(e.target.value)}/>
                    <input 
                         type="file" 
                         id={isUpdating ? `file-${obj._id}` : 'add'}
                         onChange={(e) => setFile(e.target.files[0])}/>
                    <label htmlFor={isUpdating ? `file-${obj._id}` : 'add'} className="file__upload">
                         <i className="fa-solid fa-upload"></i>
                         <h6>Выберите файл</h6>
                    </label>
                    <div 
                         className="field__block-submit"
                         style={{'padding': '0'}}>
                         <input 
                              type="submit" 
                              value="Сохранить" 
                              className="field__submit"/>
                         {
                              isUpdating && (
                                   <button 
                                        className="field__submit-delete"
                                        type="button"
                                        onClick={(e) => deleteDocument(e)}>
                                             Удалить
                                   </button>
                              )
                         }
                         <h5>{message}</h5>
                    </div>
               </div>   
          </form>
     )
}

export default AddOrUpdateDocumentForm;