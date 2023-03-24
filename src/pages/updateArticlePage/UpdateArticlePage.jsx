import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import {CKEditor} from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorContainer from '../../components/editor/EditorContainer';

import axios from '../../services/backendService';
import SubmitBlock from '../../components/submitBlock/submitBlock';


const UpdateArticlePage = () => {
     const { id } = useParams();

     const [isLoading, setIsLoading] = useState(true);
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
     const [cities, setCities] = useState([]);
     const handleChangeCity = (event) => {
          setCity(event.target.value);
     }
     const handleChangeChecked = (event) => {
          setIsChecked(event.target.checked);
          console.log(isChecked);
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

     useEffect(() => {
          const fetchData = async () => {
               const responseArticle = await axios.get(`/blog/${id}`);
               const responseCities = await axios.get('/city/all');
               setRuTitle(responseArticle.data.title.ru);
               setKzTitle(responseArticle.data.title.kz);
               setEnTitle(responseArticle.data.title.en);
               setRuContent(responseArticle.data.content.ru);
               setKzContent(responseArticle.data.content.kz);
               setEnContent(responseArticle.data.content.en);
               setImage(`${axios.defaults.baseURL}/uploads/blog/${responseArticle.data.imageUrl}`);
               setCity(responseArticle.data.city);
               setIsChecked(responseArticle.data.isRelatedToCity);
               setCities(responseCities.data);
          }
          fetchData();
          axios.get(`/blog/${id}`)
               .then(res => {
                    
               })
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, []);

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
          image && (formData.append('blog', image));
          formData.append('id', id);
          formData.append('isRelatedToCity', isChecked);
          formData.append('city', city);
          console.log(city);
          setMessage('Загрузка...');
          try {
               const res = await axios.post('/blog/update', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token'),
                         "Content-Type":"multipart/form-data"
                    }
               });
               setMessage('Обновление статьи прошло успешно!');
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage('Произошла ошибка во время обновления статьи!');
          }
     }
     return (
          <div className="article">
               <div className="section__title">Редактирование статьи</div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
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
                                                  <img src={image} alt="Предпросмотр" className="preview" />
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
                                                                      cities.map(obj => (
                                                                           <option 
                                                                                value={obj._id}
                                                                                selected={obj._id === city}>
                                                                                     {obj.name.ru}
                                                                           </option>
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
                    )
               }
          </div>
     )
}

export default UpdateArticlePage;