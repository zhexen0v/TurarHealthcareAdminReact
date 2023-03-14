import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from '../../services/backendService';

import './editPage.scss';
import SubmitBlock from '../../components/submitBlock/submitBlock';

const EditPage = () => {
     const { id } = useParams();
     const [isLoading, setIsLoading] = useState(true);
     const [message, setMessage] = useState('');
     const [link, setLink] = useState('');
     const [ruTitle, setRuTitle] = useState('');
     const [kzTitle, setKzTitle] = useState('');
     const [enTitle, setEnTitle] = useState('');
     const [ruContent, setRuContent] = useState('');
     const [kzContent, setKzContent] = useState('');
     const [enContent, setEnContent] = useState('');

     useEffect(() => {
          axios.get(`/nested/${id}`)
               .then(res => {
                    setRuTitle(res.data.title.ru);
                    setKzTitle(res.data.title.kz);
                    setEnTitle(res.data.title.en);
                    setRuContent(res.data.content.ru);
                    setKzContent(res.data.content.kz);
                    setEnContent(res.data.content.en);
                    setLink(res.data.link);
               })
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false)); 
     }, []);

     const sendData = async (event) => {
          event.preventDefault();
          const data = {
               id: id,
               title: {
                    ru: ruTitle,
                    kz: kzTitle,
                    en: enTitle
               },
               content: {
                    ru: ruContent,
                    kz: kzContent,
                    en: enContent
               },
               link: link
          }
          setMessage('Загрузка...');
          try {
               const res = await axios.post('/page/nested/update', data, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setMessage('Обновление данных прошло успешно!');
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage('Произошла ошибка во время обновление данных!');
          }
     }
     return (
          <div className="edit">
               <div className="section__title">Редактирование страницы</div>
               {
                    isLoading ? (
                         <h2>Загрузка...</h2>
                    ) : (
                         <form onSubmit={(e) => sendData(e)}>
                              <div className="field__block">
                                   <h6 className="field__title">Название страницы на русском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        name="title.ru"
                                        value={ruTitle} 
                                        onChange={(e) => setRuTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Название страницы на казахском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        name="title.kz"
                                        value={kzTitle} 
                                        onChange={(e) => setKzTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Название страницы на английском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        name="title.en"
                                        value={enTitle} 
                                        onChange={(e) => setEnTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Ссылка на страницу</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        name="link"
                                        value={link} 
                                        onChange={(e) => setLink(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Текст страницы на русском языке</h6>
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
                                   <h6 className="field__title">Текст страницы на казахском языке</h6>
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
                                   <h6 className="field__title">Текст страницы на английском языке</h6>
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
                         </form>
                    )
               }
          </div>
     )
}

export default EditPage;