import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const LendingCard = props => {
   const {
      id,
      firstName,
      lastName,
      phoneNumber,
      date,
      deleteData,
      editData,
      path,
      data,
   } = props;
   return (
      <div className='user'>
         <div className='user-top p-3 d-flex justify-content-between align-items-center'>
            <div className='user-name'>
               {firstName} {lastName}
            </div>
            <div className='btns'>
               <Link to={`/${path}/${id}`} className='btn btn-outline-primary'>
                  M
               </Link>
               <button
                  className='btn btn-outline-warning mx-3'
                  onClick={() => editData(id)}
               >
                  E
               </button>
               <button
                  className='btn btn-outline-danger'
                  onClick={() => deleteData(id)}
               >
                  D
               </button>
            </div>
         </div>
         <div className='p-3 d-flex justify-content-between align-items-center'>
            <div>
               Phone : <b>{phoneNumber}</b>
            </div>
            <div>
               Amount of money: <b>{data}</b>
            </div>
            <div>
               Date: <b>{date}</b>
            </div>
         </div>
      </div>
   );
};

LendingCard.prototype = {
   id: PropTypes.number,
   bebt: PropTypes.number,
   firstName: PropTypes.string,
   lastName: PropTypes.string,
   phoneNumber: PropTypes.string,
};
export default LendingCard;
