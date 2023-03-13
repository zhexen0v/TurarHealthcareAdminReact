import { useState } from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from '../../services/backendService';
import SubmitBlock from '../../components/submitBlock/submitBlock';

import './createArticlePage.scss';

const CreateArticlePage = () => {
     const [message, setMessage] = useState('');
     const [selectedImage, setSelectedImage] = useState(null);
     const [image, setImage] = useState(null);
     const [ruTitle, setRuTitle] = useState('');
     const [kzTitle, setKzTitle] = useState('');
     const [enTitle, setEnTitle] = useState('');
     const [ruContent, setRuContent] = useState('');
     const [kzContent, setKzContent] = useState('');
     const [enContent, setEnContent] = useState('');

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
               kz: {
                    title: kzTitle,
                    content: kzContent
               },
               ru: {
                    title: ruTitle,
                    content: ruContent
               },
               en: {
                    title: enTitle,
                    content: enContent
               }
          }
          const formData = new FormData();
          const json = JSON.stringify(data);
          formData.append('json', json);
          formData.append('blog', image);
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
     return (
          <div className="article">
               {
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
                                        <CKEditor
                                             editor={ClassicEditor}
                                             data={ruContent}
                                             onReady={(editor) => {
                                                  console.log( "CKEditor5 React Component is ready to use!", editor );
                                             }}
                                             onChange={(event, editor) => {
                                                  const data = editor.getData();
                                                  setRuContent(data);
                                             }}/>
                                   </div>
                                   <div className="field__block">
                                        <h6 className="field__title">Текст статьи на казахском языке</h6>
                                        <CKEditor
                                             editor={ClassicEditor}
                                             data={kzContent}
                                             onReady={(editor) => {
                                                  console.log( "CKEditor5 React Component is ready to use!", editor );
                                             }}
                                             onChange={(_, editor) => {
                                                  const data = editor.getData();
                                                  setKzContent(data);
                                             }}/>
                                   </div>
                                   <div className="field__block">
                                        <h6 className="field__title">Текст статьи на английском языке</h6>
                                        <CKEditor
                                             editor={ClassicEditor}
                                             data={enContent}
                                             onReady={(editor) => {
                                                  console.log( "CKEditor5 React Component is ready to use!", editor );
                                             }}
                                             onChange={(_, editor) => {
                                                  const data = editor.getData();
                                                  setEnContent(data);
                                             }}/>
                                   </div>
                                   <SubmitBlock
                                        message={message}/>
                              </div>
                              <div className="article__part">
                                   <div className="field__block">
                                        <h6 className="field__title">Обложка статьи</h6>
                                        <input 
                                             type="file" 
                                             onChange={(e) => handleImageChange(e)}
                                             id="bg"/>
                                        <label for="bg" class="file__upload">
                                             <i class="fa-solid fa-upload"></i>
                                             <h6>Выберите файл</h6>
                                        </label>
                                   </div>
                                   <h6 className="field__title">Предпросмотр обложки статьи</h6>
                                   {
                                        selectedImage ? (
                                             <img src={selectedImage} alt="Предпросмотр" className="preview" />
                                        ) : (
                                             <div className="preview-empty">
                                                  <i class="fa-regular fa-image"></i>
                                             </div>
                                        )
                                   }
                              </div>
                         </div>
                         
                         
                    </form>
               }
          </div>
     )
}

export default CreateArticlePage;