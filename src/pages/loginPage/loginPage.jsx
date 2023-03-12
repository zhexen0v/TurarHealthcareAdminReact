import { useState } from 'react';
import axios from '../../services/backendService';


const LoginPage = () => {
     if (window?.location.pathname === '/login') {
          require('./loginPage.scss')
     }

     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const [message, setMessage] = useState('');

     const loginAdmin = async (event) => {
          event.preventDefault();
          const data = {
               username: login,
               password: password
          }
          await axios.post('/login', data)
               .then(res => {
                    console.log(res);
                    localStorage.setItem('token', res.data.token);
                    setMessage('');
                    window.location = '/general';
               })
               .catch(err => {
                    console.log(err);
                    setMessage('Неверный логин и пароль');
               });
          
     }

     return (
          <form className="login" onSubmit={(e) => loginAdmin(e)}>
               <h2 className="login__title">Войти в админ-панель</h2>
               <div className="login__block">
                    <h6 className="login__block-text">Имя пользователя</h6>
                    <input type="text" className="login__block-input" onChange={(e) => setLogin(e.target.value)} />
               </div>
               <div className="login__block">
                    <h6 className="login__block-text">Пароль</h6>
                    <input type="password" className="login__block-input" onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div className="login__block">
                    <input type="submit" className="login__block-submit" value="Войти" />
               </div>
               <div className="login__message">{message}</div>
          </form>
     )
}

export default LoginPage;