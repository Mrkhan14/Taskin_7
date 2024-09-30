import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const Card = props => {
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
   console.log('Card');

   return (
      <div className='user'>
         <div className='user-top p-3 d-flex justify-content-between align-items-center'>
            <div className='user-name w-25 text-right'>
               Product Name: <b>{productName}</b>
            </div>
            <div className='user-name w-25'>
               Price: <b>{price}</b>
            </div>

            <div className='user-name w-25'>
               Group: <b>{group}</b>
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
      </div>
   );
};

Card.prototype = {
   id: PropTypes.number,
   quantity: PropTypes.string,
   group: PropTypes.string,
};
export default memo(Card);
