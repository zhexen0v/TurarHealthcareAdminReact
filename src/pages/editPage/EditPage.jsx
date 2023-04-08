import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../services/BackendService';
import AddOrUpdateDocumentForm from '../../components/addOrUpdateDocumentForm/AddOrUpdateDocumentForm';
import EditorContainer from '../../components/editor/EditorContainer';

import './editPage.scss';
import SubmitBlock from '../../components/submitBlock/submitBlock';

const EditPage = ({isPagePart}) => {
     const { id } = useParams();
     const [isLoading, setIsLoading] = useState(true);
     const [message, setMessage] = useState('');
     const [link, setLink] = useState('');
     const [isList, setIsList] = useState(false);
     const [ruTitle, setRuTitle] = useState('');
     const [kzTitle, setKzTitle] = useState('');
     const [enTitle, setEnTitle] = useState('');
     const [ruContent, setRuContent] = useState('');
     const [kzContent, setKzContent] = useState('');
     const [enContent, setEnContent] = useState('');
     const [documents, setDocuments] = useState([]);

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
               try {
                    const responsePage = await axios.get(isPagePart ? `/part/${id}` : `/nested/${id}`);
                    const responseDocuments = await axios.get(isPagePart ? `/documents/part/${id}` : `/documents/${id}`);
                    setIsList(responsePage.data.isListOfDocuments);
                    setRuTitle(responsePage.data.title.ru);
                    setKzTitle(responsePage.data.title.kz);
                    setEnTitle(responsePage.data.title.en);
                    setLink(responsePage.data.link);
                    if (responsePage.data.isListOfDocuments) {
                         setDocuments(responseDocuments.data);
                    } else {
                         setRuContent(responsePage.data.content.ru);
                         setKzContent(responsePage.data.content.kz);
                         setEnContent(responsePage.data.content.en);
                    }
                    setIsLoading(false);
               } catch (error) {
                    console.log(error);
               }
          }

          fetchData();
     }, [documents]);

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
               const res = await axios.post(isPagePart ? '/page/part/update' : '/page/nested/update', data, {
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
                         <>
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
                              {
                                   !isList && (
                                        <>
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
                                        </>
                                   )
                              }
                              <SubmitBlock
                                   message={message}/>
                         </form>
                         {
                              isList && (
                                   <>
                                        <AddOrUpdateDocumentForm
                                             key={1}
                                             isUpdating={false}
                                             isPagePart={isPagePart}
                                             pageId={id}/>
                                        
                                        <div className="section__title" style={{'marginTop':'16px'}}>Обновление документов</div>
                                   </>  
                              )
                         }
                         {
                              isList && documents.length > 0 && (
                                   documents.map((obj) => (
                                        <AddOrUpdateDocumentForm
                                             key={obj._id}
                                             isUpdating={true}
                                             isPagePart={isPagePart}
                                             pageId={id}
                                             obj={obj}/>
                                   ))
                              )
                         }
                         </>
                    )
               }
          </div>
     )
}

export default EditPage;