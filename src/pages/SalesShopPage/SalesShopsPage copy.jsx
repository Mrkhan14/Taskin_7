import { useCallback, useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import PlusIcon from '../../components/UI/PlusIcon';
import LendingCard from '../../components/card/Card';
import { LIMIT } from '../../constants/index';
import { groups } from '../../data/groups';

const defaultSalesShop = {
   id: 0,
   productName: '',
   price: '',
   group: 'Non',
   quantity: '',
   description: '',
   date: '',
};

function SalesShopPage() {
   const [show, setShow] = useState(false);
   const [salesShops, setSalesShops] = useState([]);
   const [salesShop, setSalesShop] = useState(defaultSalesShop);
   const [validated, setValidated] = useState(false);
   const [search, setSearch] = useState('');
   const [selected, setSelected] = useState(null);
   const [group, setGroup] = useState('all');
   const [currentPage, setCurrentPage] = useState(1);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleSubmit = e => {
      e.preventDefault();
      if (e.currentTarget.checkValidity()) {
         if (selected === null) {
            const newUpdateSalesShops = [
               ...salesShops,
               { ...salesShop, id: v4() },
            ];
            setSalesShops(newUpdateSalesShops);
            localStorage.setItem(
               'salesShops',
               JSON.stringify(newUpdateSalesShops)
            );
            toast.success("Malumot qo'shildi");
         } else {
            const newAddSalesShops = salesShops.map(item =>
               item.id === selected ? salesShop : item
            );
            localStorage.setItem(
               'salesShops',
               JSON.stringify(newAddSalesShops)
            );
            setSalesShops(newAddSalesShops);
            toast.success("Malumot o'zgardi");
         }
         setSalesShop(defaultSalesShop);
         setValidated(false);
         handleClose();
      } else {
         setValidated(true);
         toast.error('Erverda xatolik bor');
      }
   };

   const handleChange = e => {
      setSalesShop({ ...salesShop, [e.target.id]: e.target.value });
   };

   const deleteData = id => {
      let newSalesShops = salesShops.filter(salesShop => salesShop.id !== id);
      if (newSalesShops) {
         setSalesShops(newSalesShops);
         localStorage.setItem('salesShops', JSON.stringify(newSalesShops));
         toast.success("Malumot o'chrildi");
      } else {
         toast.error('Erverda xatolik bor');
      }
   };

   const editData = id => {
      const moneyFound = salesShops.find(salesShop => salesShop.id === id);
      setSelected(id);
      setSalesShop(moneyFound);
      handleShow();
   };

   const openModal = () => {
      handleShow();
      setSelected(null);
      setSalesShop(defaultSalesShop);
   };

   const handleSearch = useCallback(e => {
      setSearch(e.target.value.trim().toLowerCase());
   }, []);

   useEffect(() => {
      const salesShops = JSON.parse(localStorage.getItem('salesShops'));
      const newData = Array.isArray(salesShops) ? salesShops : [];
      setSalesShops(newData);
   }, []);

   const filteredSalesShops = salesShops.filter(
      salesShop =>
         salesShop.productName.toLowerCase().includes(search) &&
         (group === 'all' || salesShop.group === group)
   );

   const totalPages = Math.ceil(filteredSalesShops.length / LIMIT);
   const paginatedSalesShops = filteredSalesShops.slice(
      (currentPage - 1) * LIMIT,
      currentPage * LIMIT
   );

   const handlePageChange = pageNumber => {
      setCurrentPage(pageNumber);
   };

   return (
      <div>
         <button
            onClick={openModal}
            className='btn btn-outline-warning ui-style mx-3 rounded-circle'
         >
            <PlusIcon></PlusIcon>
         </button>

         <InputGroup className='Search mb-3'>
            <Form.Control
               value={search}
               onChange={handleSearch}
               placeholder='Filter'
            />
            <InputGroup.Text>
               <Form.Select
                  value={group}
                  onChange={e => setGroup(e.target.value)}
               >
                  <option value='all'>ALL GROUPS</option>
                  {groups.map(group => (
                     <option key={group} value={group}>
                        {group}
                     </option>
                  ))}
               </Form.Select>
            </InputGroup.Text>
         </InputGroup>

         {paginatedSalesShops.map((item, i) => (
            <LendingCard
               key={i}
               {...item}
               path='sales'
               data={item?.salesShop}
               deleteData={deleteData}
               editData={editData}
            />
         ))}

         {totalPages > 1 && (
            <div className='d-flex justify-content-center align-items-center'>
               {Array.from({ length: totalPages }, (_, i) => (
                  <button
                     key={i}
                     onClick={() => handlePageChange(i + 1)}
                     className={` button page-item ${
                        currentPage === i + 1 ? 'active bg-primary' : ''
                     }`}
                  >
                     {i + 1}
                  </button>
               ))}
            </div>
         )}

         <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>salesShop data</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group className='mb-3' controlId='productName'>
                     <Form.Label>Product name</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={salesShop.productName}
                        type='text'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='price'>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={salesShop.price}
                        type='number'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='quantity'>
                     <Form.Label>Quantity</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={salesShop.quantity}
                        type='text'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='description'>
                     <Form.Label>description</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={salesShop.description}
                        type='text'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='date'>
                     <Form.Label>Date</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={salesShop.date}
                        type='date'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='group'>
                     <Form.Label>Groups</Form.Label>
                     <Form.Select
                        onChange={handleChange}
                        value={salesShop.group}
                     >
                        {groups.map(group => (
                           <option key={group} value={group}>
                              {group}
                           </option>
                        ))}
                     </Form.Select>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                     Close
                  </Button>
                  <Button type='submit' variant='primary'>
                     {selected === null ? 'Add' : 'Update'}
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </div>
   );
}

export default SalesShopPage;