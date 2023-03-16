import { useState } from 'react';
import axios from '../../services/backendService';

import InputBlock from "../inputBlock/inputBlock"
import SubmitBlock from '../submitBlock/submitBlock';

const AddDocumentForm = ({obj, toggle, handleFunction, isUpdating}) => {
     const [data, setData] = useState(isUpdating ? obj : {});
     const [message, setMessage] = useState('');

     const handleChange = (event) => {
          const { name, value } = event.target;
          if (name.includes('.')) {
               const [parent, child] = name.split('.');
               setData(prevState => ({
                    ...prevState,
                    [parent]: {
                         ...prevState[parent],
                         [child]: value
                    }
          }));
          } else {
               setData(prevState => ({
                    ...prevState,
                    [name]: value
               }));
          }
     };

     const updateDocumentCategory = async (event) => {
          event.preventDefault();
          try {
               setMessage('Загрузка...');
               const res = await axios.post(isUpdating ? `/document/category/update/${obj._id}` : '/document/category/add', data, {
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
          <div 
               className="document__item-modal"
               style={toggle ? {'display':'flex'} : {'display':'none'}}>
               <form 
                    className="document__item-form"
                    onSubmit={(e) => updateDocumentCategory(e)}>
                    <div className="document__item-form-close">
                         <div className="section__title">{
                              isUpdating ? ('Обновление данных категории внутренних документов') : 
                              ('Создание новой категории внутренних документов')
                         }</div>
                         <i 
                              className="fa-solid fa-xmark"
                              onClick={handleFunction}     
                         ></i>
                    </div>
                    <div className="document__item-form-wrapper">
                         
                    </div>
                    <div className="document__item-form-wrapper">
                         <InputBlock
                              title="Название категории на русском языке"
                              name="title.ru"
                              value={isUpdating ? obj.title.ru : ''}
                              handleFunction={handleChange}/>
                         <InputBlock
                              title="Название категории на казахском языке"
                              name="title.kz"
                              value={isUpdating ? obj.title.kz : ''}
                              handleFunction={handleChange}/>
                         <InputBlock
                              title="Название категории на английском языке"
                              name="title.en"
                              value={isUpdating ? obj.title.en : ''}
                              handleFunction={handleChange}/>
                         <SubmitBlock
                              message={message}/>
                    </div>   
               </form>
          </div>
     )
}

export default AddDocumentForm;