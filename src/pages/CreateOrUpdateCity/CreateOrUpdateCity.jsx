import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../services/backendService';
import SubmitBlock from '../../components/submitBlock/submitBlock';
import EditorContainer from '../../components/editor/EditorContainer';

import mapKaz from '../../resources/img/map_kazakhstan.png';
import './createOrUpdateCity.scss';

const CreateOrUpdateCity = ({isUpdating}) => {
     const { link } = useParams();
     console.log(link);
     const [isLoading, setIsLoading] = useState(isUpdating ? true : false);
     const [error, setError] = useState(null);
     const [message, setMessage] = useState('');
     const [id, setId] = useState(null);
     const [ruTitle, setRuTitle] = useState('');
     const [kzTitle, setKzTitle] = useState('');
     const [enTitle, setEnTitle] = useState('');
     const [ruContent, setRuContent] = useState('');
     const [kzContent, setKzContent] = useState('');
     const [enContent, setEnContent] = useState('');
     const [horizontal, setHorizontal] = useState(0);
     const [vertical, setVertical] = useState(0);

     const handleChangeRuContent = (value) => {
          setRuContent(value);
     }

     const handleChangeKzContent = (value) => {
          setKzContent(value);
     }

     const handleChangeEnContent = (value) => {
          setEnContent(value);
     }

     const sendData = async (event) => {
          event.preventDefault();
          const data = {
               name: {
                    kz: kzTitle,
                    ru: ruTitle,
                    en: enTitle
               },
               content: {
                    kz: kzContent,
                    ru: ruContent,
                    en: enContent
               },
               horizontal: horizontal,
               vertical: vertical
          }
          
          setMessage('Загрузка...');
          try {
               const res = await axios.post(isUpdating ? `/city/update/${id}` : '/city/add', data, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               setMessage(isUpdating ? 'Обновление данных города прошло успешно!' : 'Добавление города прошло успешно!');
               console.log(res);
          } catch (error) {
               console.log(error);
               setMessage(isUpdating ? 'Произошла ошибка во время обновление данных города!' : 'Произошла ошибка во время добавление города!');
          }
     }
     
     useEffect(() => {
          if (isUpdating) {
               axios.get(`/city/${link}`)
               .then(res => {
                    setId(res.data._id);
                    setRuTitle(res.data.name.ru);
                    setKzTitle(res.data.name.kz);
                    setEnTitle(res.data.name.en);
                    setRuContent(res.data.content.ru);
                    setKzContent(res.data.content.kz);
                    setEnContent(res.data.content.en);
                    setHorizontal(res.data.coordinates.horizontal);
                    setVertical(res.data.coordinates.vertical);
               })
               .catch(err => setError(err))
               .finally(() => setIsLoading(false));
          }
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
          <div className="city">
               <form onSubmit={(e) => sendData(e)}>
                    <div className="city__wrapper">
                         <div className="city__part">
                              <div className="section__title">Добавление нового города</div>
                              <div className="field__block">
                                   <h6 className="field__title">Название города на русском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={ruTitle} 
                                        onChange={(e) => setRuTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Название города на казахском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={kzTitle} 
                                        onChange={(e) => setKzTitle(e.target.value)}/>
                              </div>
                              <div className="field__block">
                                   <h6 className="field__title">Название города на английском языке</h6>
                                   <input 
                                        type="text" 
                                        className="field__input" 
                                        value={enTitle} 
                                        onChange={(e) => setEnTitle(e.target.value)}/>
                              </div>
                         </div>

                         <div className="city__part">
                              <div className="city__map-wrapper">
                                   <div className="city__map-part">
                                        <div className="field__block">
                                             <h6 className="field__title">Расположение на карте по горизонтали</h6>
                                             <input 
                                                  type="number"
                                                  step="any"
                                                  min="0"
                                                  max="100" 
                                                  className="field__input" 
                                                  value={horizontal} 
                                                  onChange={(e) => setHorizontal(parseInt(e.target.value))}/>
                                        </div>
                                        <div className="field__block">
                                             <h6 className="field__title">Расположение на карте по вертикали</h6>
                                             <input 
                                                  type="number"
                                                  step="any" 
                                                  min="0"
                                                  max="100"
                                                  className="field__input" 
                                                  value={vertical} 
                                                  onChange={(e) => setVertical(parseInt(e.target.value))}/>
                                        </div>
                                   </div>
                                   <div className="city__map-part">
                                        <img src={mapKaz} alt="Карта Казахстана" className="city__map-img"/>
                                        <div
                                             className="city__map-city" 
                                             style={{
                                                  'left': `${horizontal}%`,
                                                  'top': `${vertical}%`
                                        }}>
                                             <h6 className="city__map-city-name">{
                                                  ruTitle
                                             }</h6>
                                             <div className="city__map-city-dot"></div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="city__part">
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
                    </div>    
               </form>
          </div>
     )
}

export default CreateOrUpdateCity;