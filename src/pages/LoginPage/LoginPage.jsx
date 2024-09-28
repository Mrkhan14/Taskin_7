import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { IS_LOGIN, USER } from '../../constants/index';
import './LoginPage.css';

function LoginPage({ setIsLogin }) {
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const login = e => {
      e.preventDefault();

      if (username === USER.username && password === USER.password) {
         toast.success('Hush kelibsiz');
         navigate('/');
         setIsLogin(1);
         localStorage.setItem(IS_LOGIN, 1);
      } else {
         toast.error('Xatolik bor');
      }
   };

   return (
      <div className='login-page'>
         <div className='d-flex justify-content-start align-items-center flex-column'>
            {/* <img className='logo-img' src='/logo.png' alt='' />   */}

            <h4>Login</h4>

            <form onSubmit={login}>
               <input
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  type='text'
                  name='username'
                  placeholder='User name'
                  className='form-control mb-4'
               />
               <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type='password'
                  name='username'
                  placeholder='Password name'
                  className='form-control mb-4'
               />
               <button type='submit' className='btn btn-success w-100'>
                  Send
               </button>
            </form>
         </div>

         <ToastContainer />
      </div>
   );
}
LoginPage.propTypes = {
   setIsLogin: PropTypes.func,
};

export default LoginPage;
