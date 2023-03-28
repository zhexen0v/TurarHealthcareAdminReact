import { useState } from 'react';
import SubmitBlock from '../submitBlock/submitBlock';

import axios from '../../services/backendService';

import './partnerItem.scss';

const PartnerItem = ({id, image, ruTitle, kzTitle, enTitle, create, setAddedOrDeleted, partnerLink}) => {
     const [isDeleting, setIsDeleting] = useState(false);
     const [message, setMessage] = useState('');
     const [selectedImage, setSelectedImage] = useState(null);
     const [updatedImage, setUpdatedImage] = useState(null);
     const [rus, setRus] = useState(ruTitle);
     const [kaz, setKaz] = useState(kzTitle);
     const [eng, setEng] = useState(enTitle);
     const [link, setLink] = useState(partnerLink);

     const toggleDeleteSubmit = () => {
          setIsDeleting(prev => !prev);
     }

     const handleImageChange = (event) => {
          const file = event.target.files[0];
          setUpdatedImage(file);   
          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    setSelectedImage(reader.result);
               };
               reader.readAsDataURL(file);
          }
     };

     const deletePartner = async (event) => {
          event.preventDefault();
          try {
               axios.post(`/partner/delete/${id}`, null, {
                         headers: {
                              Authorization: localStorage.getItem('token'),
                              "Content-Type":"multipart/form-data"
                         }
                    })
                    .then(res => {
                         console.log(res);
                         setAddedOrDeleted(true);
                    })
                    .catch(err => console.log(err));
          } catch (error) {
               console.log(error);
          }
     }

     const sendData = async (event) => {
          event.preventDefault();
          const formData = new FormData();
          if (!create) {
               formData.append('id', id);
          }
          formData.append('ru', rus);   
          formData.append('kz', kaz);   
          formData.append('en', eng);
          if (link) {
               formData.append('link', link);
          }   
          updatedImage && (formData.append('partner', updatedImage));
          setMessage('Загрузка...');
          try {
               const res = await axios.post(create ? '/partner/add' : '/partner/update', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token'),
                         "Content-Type":"multipart/form-data"
                    }
               });
               setMessage(create ? 'Добавление нового партнера прошло успешно!' : 'Обновление данных прошло успешно!');
               setAddedOrDeleted(true);
               if (create) {
                    setSelectedImage(null);
                    setRus('');
                    setKaz('');
                    setEng('');
                    setLink('');
               }
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage(create ? 'Произошла ошибка во время добавления партнера!' : 'Произошла ошибка во время обновления данных!');
          }
     }
     return (
          <div className="partner__item">
               <div className="partner__item-img">
                    {
                         selectedImage ? (
                              <img src={selectedImage} alt="Логотип" />
                         ) : create ? (
                              <div className="preview-empty" style={{'height':'100%'}}>
                                   <i className="fa-regular fa-image"></i>
                              </div>
                         ) : (
                              <img src={`${axios.defaults.baseURL}/uploads/partners/${image}`} alt="Логотип" />
                         )
                    }
                    {
                         
                         !create && (
                              <form onSubmit={(e) => deletePartner(e)}>
                                   <div className="partner__delete" onClick={toggleDeleteSubmit}>                                   
                                        <i className="fa-solid fa-trash"></i>
                                   </div>
                                   {
                                        isDeleting && (
                                             <input type='submit' className="partner__delete partner__submit" value="Подтвердить"/>
                                        )
                                   }
                              </form>
                         )
                    }
               </div>
               <div className="partner__item-info">
                    <form onSubmit={(e) => sendData(e)}>
                         <div className="field__block">
                              <h6 className="field__title">Название партнера на русском языке</h6>
                              <input 
                                   type="text" 
                                   className="field__input" 
                                   value={rus} 
                                   onChange={(e) => setRus(e.target.value)}/>
                         </div>
                         <div className="field__block">
                              <h6 className="field__title">Название партнера на казахском языке</h6>
                              <input 
                                   type="text" 
                                   className="field__input" 
                                   value={kaz} 
                                   onChange={(e) => setKaz(e.target.value)}/>
                         </div>
                         <div className="field__block">
                              <h6 className="field__title">Название партнера на английском языке</h6>
                              <input 
                                   type="text" 
                                   className="field__input" 
                                   value={eng} 
                                   onChange={(e) => setEng(e.target.value)}/>
                         </div>
                         <div className="field__block">
                              <h6 className="field__title">Ссылка на сайт партнера</h6>
                              <input 
                                   type="text" 
                                   className="field__input" 
                                   value={link} 
                                   onChange={(e) => setLink(e.target.value)}/>
                         </div>
                         <div className="field__block">
                              <h6 className="field__title">Изображение партнера</h6>
                              <input 
                                   type="file" 
                                   accept="image/*"
                                   onChange={(e) => handleImageChange(e)}
                                   id={id}/>
                              <label htmlFor={id} className="file__upload">
                                   <i className="fa-solid fa-upload"></i>
                                   <h6>Выберите файл</h6>
                              </label>
                         </div>
                         <SubmitBlock
                              message={message}/>
                    </form>
               </div>
          </div>
     )
}

export default PartnerItem;