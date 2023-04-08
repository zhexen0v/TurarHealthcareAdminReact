import { useState, useEffect } from 'react';
import axios from '../../services/BackendService';

import EditorContainer from '../../components/editor/EditorContainer';
import SubmitBlock from '../../components/submitBlock/submitBlock';

import './createArticlePage.scss';

const CreateArticlePage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(null);
     const [cities, setCities] = useState([]);
     const [message, setMessage] = useState('');
     const [selectedImage, setSelectedImage] = useState(null);
     const [image, setImage] = useState(null);
     const [ruTitle, setRuTitle] = useState('');
     const [kzTitle, setKzTitle] = useState('');
     const [enTitle, setEnTitle] = useState('');
     const [ruContent, setRuContent] = useState('');
     const [kzContent, setKzContent] = useState('');
     const [enContent, setEnContent] = useState('');
     const [isChecked, setIsChecked] = useState(false);
     const [city, setCity] = useState('');
     const handleChangeCity = (event) => {
          setCity(event.target.value);
     }
     const handleChangeChecked = (event) => {
          setIsChecked(event.target.checked);
     };

     const handleChangeRuContent = (value) => {
          setRuContent(value);
     }

     const handleChangeKzContent = (value) => {
          setKzContent(value);
     }

     const handleChangeEnContent = (value) => {
          setEnContent(value);
     }
     const handleImageChange = (event) => {
          const file = event.target.files[0];
          setImage(file);
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
     };

     const sendData = async (event) => {
          event.preventDefault();
          const data = {
               title: {
                    kz: kzTitle,
                    ru: ruTitle,
                    en: enTitle
               },
               content: {
                    kz: kzContent,
                    ru: ruContent,
                    en: enContent
               }
          }
          const formData = new FormData();
          const json = JSON.stringify(data);
          formData.append('json', json);
          formData.append('blog', image);
          formData.append('isRelatedToCity', isChecked);
          isChecked && (formData.append('city', city));
          setMessage('Загрузка...');
          try {
               const res = await axios.post('/blog/add', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token'),
                         "Content-Type":"multipart/form-data"
                    }
               });
               setMessage('Создание статьи прошло успешно!');
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage('Произошла ошибка во время создания статьи!');
          }
     }

     useEffect(() => {
          axios.get('/city/all')
               .then(res => setCities(res.data))
               .catch(err => setError(err))
               .finally(() => setIsLoading(false));
     }, []);

     if (isLoading) {
          return (
               <h2>Загрузка...</h2>
          )
     }

     if (error) {
          return (
               <h2>{error.message}</h2>
          )
     }

     return (
          <div className="article">
               <div className="section__title">Cоздание статьи</div>
               <form onSubmit={(e) => sendData(e)}>
                    <div className="article__wrapper">
                         <div className="article__part">
                              <div className="field__block">
                                   <h6 className="field__title">Заголовок статьи на русском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={ruTitle} 
                                        onChange={(e) => setRuTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Заголовок статьи на казахском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={kzTitle} 
                                        onChange={(e) => setKzTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Заголовок статьи на английском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={enTitle} 
                                        onChange={(e) => setEnTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Текст статьи на русском языке</h6>
                                   <EditorContainer
                                        key={1}
                                        toolbarId="t1"
                                        value={ruContent}
                                        setValue={handleChangeRuContent}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Текст статьи на казахском языке</h6>
                                   <EditorContainer
                                        key={2}
                                        toolbarId="t2"
                                        value={kzContent}
                                        setValue={handleChangeKzContent}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Текст статьи на английском языке</h6>
                                   <EditorContainer
                                        key={3}
                                        toolbarId="t3"
                                        value={enContent}
                                        setValue={handleChangeEnContent}/>
                              </div>
                              <SubmitBlock
                                   message={message}/>
                         </div>
                         <div className="article__part">
                              <div className="field__block">
                                   <h6 className="field__title">Обложка статьи</h6>
                                   <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e)}
                                        id="bg"/>
                                   <label for="bg" className="file__upload">
                                        <i className="fa-solid fa-upload"></i>
                                        <h6>Выберите файл</h6>
                                   </label>
                              </div>
                              <h6 className="field__title">Предпросмотр обложки статьи</h6>
                              {
                                   selectedImage ? (
                                        <img src={selectedImage} alt="Предпросмотр" className="preview" />
                                   ) : (
                                        <div className="preview-empty">
                                             <i className="fa-regular fa-image"></i>
                                        </div>
                                   )
                              }
                              <div className="field__block">
                                   <h6 className="field__title">Это новость связана с объектами?</h6>
                                   <label className="switch">
                                        <input 
                                             type="checkbox"
                                             checked={isChecked}
                                             onChange={handleChangeChecked}/>
                                        <span className="slider round"></span>
                                   </label>
                              </div>
                              <div className="field__block">
                                   {
                                        isChecked && (
                                             <>
                                                  <h6 className="field__title">Выберите город:</h6>
                                                  <select name="city" className="field__input" onChange={handleChangeCity}>
                                                       {
                                                            cities.map(city => (
                                                                 <option value={city._id}>{city.name.ru}</option>
                                                            ))
                                                       }
                                                  </select>
                                             </>
                                        )
                                   }
                              </div>
                         </div>

                    </div>
                    
                    
               </form>
          </div>
     )
}

export default CreateArticlePage;