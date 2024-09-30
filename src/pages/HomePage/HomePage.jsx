import React, { useEffect, useState } from 'react';

function HomePage() {
   const [totalItem, setTotalItem] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantity, setTotalQuantity] = useState(0);

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem('salesShops')) || [];
      const itemCount = data.length;
      const totalItemPrice = data.reduce(
         (acc, item) =>
            acc + parseFloat(item.price) * parseFloat(item.quantity),
         0
      );
      const totalItemQuantity = data.reduce(
         (acc, item) => acc + parseFloat(item.quantity),
         0
      );

      setTotalItem(itemCount);
      setTotalPrice(totalItemPrice);
      setTotalQuantity(totalItemQuantity);
   }, []);

   return (
      <div className='p-3'>
         <div className='item-home debts mb-4 mt-4 d-flex justify-content-between'>
            <div>
               <div className='title'>Product Total</div>
               <div className='total'>{totalItem}</div>
            </div>
         </div>
         <div className='item-home borrowing mb-4 mt-4 d-flex justify-content-between'>
            <div>
               <div className='title'>Quantity Total</div>
               <div className='total'>{totalQuantity}</div>
            </div>
         </div>
         <div className='item-home borrowing mb-4 mt-4 d-flex justify-content-between'>
            <div>
               <div className='title'>Total</div>
               <div className='total'>{totalPrice.toFixed(2)}</div>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
