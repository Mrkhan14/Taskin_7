import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { IS_LOGIN } from '../../constants/index';

const Header = () => {
   const handleLogout = () => {
      localStorage.removeItem(IS_LOGIN);
   };
   return (
      <header className='header-block align-items-center'>
         <div>
            <div className='w-50 d-flex'>
            <div className='logo'>
               {/* <img className='logo-img' src='/logo.png' alt='' /> */}
               <span>Tinch</span>
            </div>
               <ul className='nav'>
                  <li className='nav-item me-4'>
                     <NavLink className='nav-link' to='/'>
                        <span className='name-block'>Home</span>
                     </NavLink>
                  </li>
                  <li className='nav-item me-4'>
                     <NavLink className='nav-link' to='/sales'>
                        <span className='name-block'>Sales</span>
                     </NavLink>
                  </li>
                  <li className='nav-item me-4'>
                     <NavLink className='nav-link' to='/react'>
                        <span className='name-block'>React</span>
                     </NavLink>
                  </li>
                  
               </ul>
            </div>

            <NavLink to='/login' onClick={handleLogout}>
               <img src='/icons/LoginIcon.svg' alt='' />
            </NavLink>
         </div>
      </header>
   );
};

export default Header;
