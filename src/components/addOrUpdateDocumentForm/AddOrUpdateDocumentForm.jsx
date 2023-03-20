import { useState } from 'react';
import axios from '../../services/backendService';

import InputBlock from "../inputBlock/inputBlock"
import SubmitBlock from '../submitBlock/submitBlock';

const AddOrUpdateDocumentForm = ({obj, isUpdating}) => {
     const [message, setMessage] = useState('');
     const [kzName, setKzName] = useState(isUpdating ? obj.name.kz : '');
     const [ruName, setRuName] = useState(isUpdating ? obj.name.ru : '');
     const [enName, setEnName] = useState(isUpdating ? obj.name.en : '');
     //const [file, setFile] = useState(null);

     const updateDocumentCategory = async (event) => {
          event.preventDefault();
          try {
               setMessage('Загрузка...');

               const formData = new FormData();
               // formData.append('file', file);
               // formData.append('documentCategory', currentCategory);
               // formData.append('kzName')
               const res = await axios.post(isUpdating ? `/document/update/${obj._id}` : '/document/add', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setMessage(isUpdating ? 'Обновление данных прошло успешно!' : 'Создание категории прошло успешно!');
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage(isUpdating ? 'Произошла ошибка во время обновление данных!' : 'Произошла ошибка во время создании новой категории!');
          }
     }
     return (
          <form 
                    className="document__item-form"
                    onSubmit={(e) => updateDocumentCategory(e)}>
                    <div className="document__item-form-close">
                         <div className="section__title">{
                              isUpdating ? ('Обновление данных документа') : 
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
                         <input type="file" id="add"/>
                         <label htmlFor="add" className="file__upload">
                              <i className="fa-solid fa-upload"></i>
                              <h6>Выберите файл</h6>
                         </label>
                         <SubmitBlock
                              paddingDisable={true}
                              message={message}/>
                    </div>   
               </form>
     )
}

export default AddOrUpdateDocumentForm;