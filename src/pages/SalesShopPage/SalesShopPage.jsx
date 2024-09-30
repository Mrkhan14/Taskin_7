import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';

const LendingPage = () => {
   const { pageId } = useParams();
   const [status, setStatus] = useState('LOADING');
   const [salesShop, setSalesShop] = useState(null);

   useEffect(() => {
      const getData = async () => {
         await setStatus('LOADING');
         try {
            const salesShops = JSON.parse(localStorage.getItem('salesShops'));
            const newSalesShops = Array.isArray(salesShops) ? salesShops : [];
            const salesShop = newSalesShops.find(
               salesShop => salesShop?.id === pageId
            );
            setSalesShop(salesShop);
            const status = salesShop ? 'SUCCESS' : 'ERROR';
            setStatus(status);
         } catch {
            setStatus('ERROR');
         }
      };
      getData();
   }, [pageId]);
   return status === 'LOADING' ? (
      <div>Loading...</div>
   ) : status === 'SUCCESS' ? (
      <div className='m-4'>
         <Card style={{ width: '100%' }}>
            <Card.Body>
               <Card.Title>Product: {salesShop?.productName}</Card.Title>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     Price: <b>{salesShop?.price}</b>{' '}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Group: <b>{salesShop?.group}</b>{' '}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Quantity: <b>{salesShop?.quantity}</b>{' '}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Description: <b>{salesShop?.description}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Date: <b>{salesShop?.date}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Total: <b>{salesShop?.price * salesShop?.quantity}</b>
                  </ListGroup.Item>
               </ListGroup>
            </Card.Body>
         </Card>
      </div>
   ) : (
      <div>Not found</div>
   );
};

export default LendingPage;
