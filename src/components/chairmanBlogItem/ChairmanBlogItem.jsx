import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/backendService';

import SubmitBlock from '../submitBlock/submitBlock';

import './chairmanBlogItem.scss';

const ChairmanBlogItem = ({obj, isAnswered}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [message, setMessage] =  useState('');
     const [answer, setAnswer] =  useState('');
     const [isChecked, setIsChecked] = useState(obj.access);
     const handleChangeAnswer = (event) => {
          setAnswer(event.target.value);
     }
     const handleChangeEditing = () => {
          setIsEditing(!isEditing);
     }
     const handleChangeChecked = async () => {
          setIsChecked(!isChecked);
     }

     const showOrHideMail = async (event) => {
          event.preventDefault();
          if (isChecked) {
               try {
                    await axios.post(`/mail/show/${obj._id}`, null, {
                         headers: {
                              Authorization: localStorage.getItem('token')
                         }
                    });
               } catch (error) {
                    console.log(error);
               }
          } else {
               try {
                    await axios.post(`/mail/hide/${obj._id}`, null, {
                         headers: {
                              Authorization: localStorage.getItem('token')
                         }
                    });
               } catch (error) {
                    console.log(error);
               }
          }
     }

     const deleteMail = async (event) => {
          event.preventDefault();
          try {
               await axios.post(`/mail/delete/${obj._id}`, null, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
          } catch (error) {
               console.log(error);
          }
     }

     const showCorrectDateFormat = (dateStr) => {
          const date = new Date(dateStr);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${getZero(day)}.${getZero(month)}.${getZero(year)} ${getZero(hour)}:${getZero(minutes)}`;
     }
     const getZero = (num) => (num > 9 ? ""+ num : "0"+num);

     const answerMail = async (event) => {
          event.preventDefault();
          setMessage('Загрузка...')
          console.log(obj._id);
          try {
               const res = await axios.post(`/mail/answer/${obj._id}`, {answer: answer}, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               });
               console.log(res);
               setMessage('Отправка сообщение прошло успешно!')
          } catch (error) {
               console.log(error);
               setMessage('Произошла ошибка во время отправки ответа!')
          }
     }

     return (
          <div className="chairman__item">
               <div className="chairman__item-header">
                    <div className="chairman__item-header-part">
                         <div className="chairman__item-header-item">
                              <i class="fa-solid fa-user"></i>
                              <p>{obj.senderData.name} {obj.senderData.surname}</p>
                         </div>
                         <div className="chairman__item-header-item">
                              <i class="fa-solid fa-at"></i>
                              <p>{obj.senderData.email}</p>
                         </div>
                         <div className="chairman__item-header-item">
                              <i class="fa-regular fa-calendar"></i>
                              <p>{showCorrectDateFormat(obj.createdAt)}</p>
                         </div>
                    </div>
                    {
                         isAnswered ? (
                              <div className="chairman__item-header-part">
                                   <form onSubmit={showOrHideMail}>
                                        <input type="checkbox" checked={isChecked} onClick={handleChangeChecked} />
                                        <button type="submit"><i class="fa-solid fa-floppy-disk"></i></button>
                                   </form>
                              </div>
                         ) : (
                              <form onSubmit={deleteMail}>
                                   <button type="submit" className="chairman__item-delete"><i class="fa-solid fa-trash"></i></button>
                              </form>
                         )
                    }
               </div>    
               <h2 className="chairman__item-title">Сообщение: </h2>           
               <p className="chairman__item-message">{obj.message}</p>
               {
                    obj.files.length > 0 && (
                         <>
                              <h2 className="chairman__item-title">Прикрепленные файлы:</h2>           
                              <ol>
                              {
                                   obj.files.map(file => (
                                        <li className="chairman__item-file">
                                             <Link
                                                  to={`${axios.defaults.baseURL}/uploads/mail/${file}`}>
                                                  {file}
                                             </Link>
                                        </li>
                                   ))
                              }
                              </ol>
                         </>
                    )
               }
               {
                    isAnswered && (
                         <>
                              <div className="chairman__item-edit">
                                   <button onClick={handleChangeEditing}>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                   </button>
                                   <h2 className="chairman__item-title">Ваш ответ: </h2>           
                              </div>
                              {
                                   isEditing ? (
                                        <form onSubmit={answerMail}>
                                             <textarea className="chairman__item-textarea" placeholder="Введите ваш ответ">{obj.answer}</textarea>
                                             <SubmitBlock message={message}/>
                                        </form>
                                   ) : (
                                        <p className="chairman__item-message">{obj.answer}</p>
                                   )
                              }
                         </>
                    )
               }
               {
                    !isAnswered && (
                         <form onSubmit={answerMail}>
                              <h2 className="chairman__item-title">Ваш ответ:</h2>
                              <textarea className="chairman__item-textarea" placeholder="Введите ваш ответ" onChange={handleChangeAnswer}></textarea>
                              <SubmitBlock message={message}/>
                         </form>
                    )
               } 
          </div>

     )
}

export default ChairmanBlogItem;