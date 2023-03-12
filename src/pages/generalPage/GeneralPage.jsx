import { useState, useEffect } from 'react';
import axios from '../../services/backendService';

import InputBlock from '../../components/inputBlock/inputBlock';
import SubmitBlock from '../../components/submitBlock/submitBlock';

import './generalPage.scss';


const GeneralPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [generalInformation, setGeneralInformation] = useState({});
     const [message, setMessage] = useState('');

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


     const sendData = async (e) => {
          e.preventDefault();
          setMessage('Загрузка...');
          try {
               const res = await axios.post('/general/update', generalInformation, {
                    headers: 
                    {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA5NWI1NDNlMmNiMTI1ZTFiODY1ZTEiLCJpYXQiOjE2Nzg2MjMxNTcsImV4cCI6MTY3ODYyNDk1N30.RYEzJJCyhQAOh-vbnJpennxhjdFcdKeqqH-iS0szl5I"
                    }
               })
               setMessage('Обновление данных прошло успешно!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setMessage('Произошла ошибка во время обновление данных!');
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
          {
               isLoading ? (
                    <h2>Loading...</h2>
               ) : (
                    <form onSubmit={(e) => sendData(e)}>
                    <section className="general">
                         <div className="general__part">
                              <h3 className="section__title">Общая информация</h3>
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
                              <h3 className="section__title" style={{'color': 'white'}}>Заглушка</h3>
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
                    </section>
               </form>
               )
          }
          </>
     );
}

export default GeneralPage;