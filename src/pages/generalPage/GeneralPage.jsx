import { useState, useEffect } from 'react';
import axios from '../../services/backendService';

import InputBlock from '../../components/inputBlock/inputBlock';
import SubmitBlock from '../../components/submitBlock/submitBlock';

import './generalPage.scss';


const GeneralPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [generalInformation, setGeneralInformation] = useState({});
     const [message, setMessage] = useState('');
     const [bgMessage, setBgMessage] = useState('');
     const [homeBgMessage, setHomeBgMessage] = useState('');
     const [bg, setBg] = useState(null);
     const [selectedBg, setSelectedBg] = useState(null);
     const [homeBg, setHomeBg] = useState(null);
     const [selectedHomeBg, setSelectedHomeBg] = useState(null);

     const handleChange = (event) => {
          const { name, value } = event.target;
          if (name.includes('.')) {
               const [parent, child] = name.split('.');
               setGeneralInformation(prevState => ({
                    ...prevState,
                    [parent]: {
                         ...prevState[parent],
                         [child]: value
                    }
          }));
          } else {
               setGeneralInformation(prevState => ({
                    ...prevState,
                    [name]: value
               }));
          }
     };

     const handleHomeImageChange = (event) => {
          const file = event.target.files[0];
          setHomeBg(file);
          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    setSelectedHomeBg(reader.result);
               };
               reader.readAsDataURL(file);
          }
     };

     const handImageChange = (event) => {
          const file = event.target.files[0];
          setBg(file);
          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    setSelectedBg(reader.result);
               };
               reader.readAsDataURL(file);
          }
          console.log(selectedBg);
     };


     const sendData = async (e) => {
          e.preventDefault();
          setMessage('Загрузка...');
          try {
               const res = await axios.post('/general/update', generalInformation, {
                    headers: 
                    {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setMessage('Обновление данных прошло успешно!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setMessage('Произошла ошибка во время обновление данных!');
          }
     }

     const uploadBackground = async (e) => {
          e.preventDefault();
          setBgMessage('Загрузка...');
          try {
               const formData = new FormData();
               formData.append("bg", bg);
               const res = await axios.post('/bg/change', formData, {
                    headers: 
                    {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setBgMessage('Обновление фонового изображения прошло успешно!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setBgMessage('Произошла ошибка во время обновление фонового изображения!');
          }
     }

     const uploadHomeBackground = async (e) => {
          e.preventDefault();
          setHomeBgMessage('Загрузка...');
          try {
               const formData = new FormData();
               formData.append("homebg", homeBg);
               const res = await axios.post('/homebg/change', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setHomeBgMessage('Обновление фонового изображения прошло успешно!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setHomeBgMessage('Произошла ошибка во время обновление фонового изображения!');
          }
     }

     useEffect(() => {
          axios.get('/general')
               .then(res => setGeneralInformation(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, []);
     return (  
          <>
          <form onSubmit={(e) => sendData(e)}>
               <section className="general">
                    <h3 className="section__title">Общая информация</h3>
                    {
                         isLoading ? (
                              <h2>Загрузка...</h2>
                         ) : (
                              <div className="general__wrapper">
                                   <div className="general__part">
                                        <InputBlock
                                             title="Первый заголовок"
                                             value={generalInformation.firstTitle}
                                             name="firstTitle"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Второй заголовок на русском языке"
                                             value={generalInformation.secondTitle.ru}
                                             name="secondTitle.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Второй заголовок на казахском языке"
                                             value={generalInformation.secondTitle.kz}
                                             name="secondTitle.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Второй заголовок на английском языке"
                                             value={generalInformation.secondTitle.en}
                                             name="secondTitle.en"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Дополнительный заголовок на русском языке"
                                             value={generalInformation.additionalTitle.ru}
                                             name="additionalTitle.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Дополнительный заголовок на казахском языке"
                                             value={generalInformation.additionalTitle.kz}
                                             name="additionalTitle.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Дополнительный заголовок на английском языке"
                                             value={generalInformation.additionalTitle.en}
                                             name="additionalTitle.en"
                                             handleFunction={handleChange}
                                             />
                                   </div>
                                   <div className="general__part">
                                        <InputBlock
                                             title="E-mail для связи"
                                             value={generalInformation.mail}
                                             name="mail"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Номер телефона"
                                             value={generalInformation.phoneNumber}
                                             name="phoneNumber"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Адрес на русском языке"
                                             value={generalInformation.address.ru}
                                             name="address.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Адрес на казахском языке"
                                             value={generalInformation.address.kz}
                                             name="address.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Адрес на английском языке"
                                             value={generalInformation.address.en}
                                             name="address.en"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="Ссылка на Instagram"
                                             value={generalInformation.instagramLink}
                                             name="instagramLink"
                                             handleFunction={handleChange}
                                             />
                                        <SubmitBlock
                                             message={message}/>
                                   </div>
                              </div>
                         )
                    }
               </section>
          </form>
          <form onSubmit={(e) => uploadBackground(e)}>
               <section className="bg">
                    <div className="bg__wrapper">
                         <div className="bg__part">
                              <h3 className="section__title">Фоновое изображение</h3>
                              <input type="file" accept="image/*" id="base-bg" onChange={(e) => handImageChange(e)}/>
                              <label htmlFor="base-bg" className="file__upload">
                                   <i className="fa-solid fa-upload"></i>
                                   <h6>Выберите файл</h6>
                              </label>
                              <div className="field__block-submit">
                                   <input type="submit" value="Сохранить" className="field__submit"/>
                                   <h5>{bgMessage}</h5>
                              </div>
                         </div>
                         {
                              isLoading ? (
                                   <h2>Загрузка...</h2>
                              ) : (
                                   <div className="bg__part">
                                        <h3 className="section__title">Предпросмотр</h3>
                                        <div className="bg__preview" style={
                                             {
                                                  'backgroundImage': 
                                                  `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
                                                       selectedBg ? selectedBg :
                                                       `http://localhost:4000/uploads/backgrounds/${generalInformation.bgImage}` 
                                                  })`
                                             }
                                        }>
                                             <h4 className="bg__preview-text">главная / блог / название статьи</h4>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </section>
          </form>
          <form onSubmit={(e) => uploadHomeBackground(e)}>
               <section className="bg">
                    <div className="bg__wrapper">
                         <div className="bg__part">
                              <h3 className="section__title">Фоновое изображение главной страницы</h3>
                              <input type="file" accept="image/*" id="home-bg" onChange={(e) => handleHomeImageChange(e)}/>
                              <label htmlFor="home-bg" className="file__upload">
                                   <i className="fa-solid fa-upload"></i>
                                   <h6>Выберите файл</h6>
                              </label>
                              <div className="field__block-submit">
                                   <input type="submit" value="Сохранить" className="field__submit"/>
                                   <h5>{homeBgMessage}</h5>
                              </div>
                         </div>
                         {
                              isLoading ? (
                                   <h2>Загрузка...</h2>
                              ) : (
                                   <div className="bg__part">
                                        <h3 className="section__title">Предпросмотр</h3>
                                        <div className="bg__preview" style={
                                             {
                                                  'backgroundImage': 
                                                  `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
                                                       selectedHomeBg ? selectedHomeBg :
                                                       `http://localhost:4000/uploads/backgrounds/${generalInformation.homeBgImage}` 
                                                  })`
                                             }
                                        }>
                                             <h4 className="bg__preview-text">главная страница</h4>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </section>
          </form>
          </>
     );
}

export default GeneralPage;