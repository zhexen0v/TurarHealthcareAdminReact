import { useState, useEffect } from 'react';
import axios from '../../services/backendService';

import ChairmanBlogItem from '../../components/chairmanBlogItem/ChairmanBlogItem';
import Loader from '../../components/loader/Loader';

import './chairmanBlogPage.scss';

const ChairmanBlogPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [notAnsweredMails, setNotAnsweredMails] = useState([]);
     const [answeredMails, setAnsweredMails] = useState([]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const responseNotAnsweredMails = await axios.get('/mail/notanswered');
                    const responseAnsweredMails = await axios.get('/mail/answered');
                    setNotAnsweredMails(responseNotAnsweredMails.data);
                    setAnsweredMails(responseAnsweredMails.data);
                    setIsLoading(false);
               } catch (error) {
                    console.log(error);
               }
               
          }
          fetchData();
          
     }, [notAnsweredMails, answeredMails]);

     if (isLoading) {
          return (
               <Loader/>
          )
     }
     return (
          <>
               <div className="chairman">
                    <h2 className="section__title">Неотвеченные сообщения</h2>
                    {
                         notAnsweredMails.map((mail) => (
                              <ChairmanBlogItem obj={mail} isAnswered={false}/>
                         ))
                    }
               </div>
               <div className="chairman">
                    <h2 className="section__title">Все сообщения</h2>
                    {
                         answeredMails.map((mail) => (
                              <ChairmanBlogItem obj={mail} isAnswered={true}/>
                         ))
                    }
               </div>
          </>
     )
}

export default ChairmanBlogPage;