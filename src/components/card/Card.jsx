import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const LendingCard = props => {
   const {
      id,
      productName,
      price,
      group,
      quantity,
      description,
      date,

      path,
      deleteData,
      editData,
   } = props;
   return (
      <div className='user'>
         <div className='user-top p-3 d-flex justify-content-between align-items-center'>
            <div className='user-name'>
               {productName} 
            </div>
            <div>
               Price: <b>{price}</b>
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
               Group : <b>{group}</b>
            </div>
            <div>
               Quantity: <b>{quantity}</b>
            </div>
            <div>
               description: <b>{description}</b>
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
   quantity: PropTypes.string,
   group: PropTypes.string,
};
export default LendingCard;
