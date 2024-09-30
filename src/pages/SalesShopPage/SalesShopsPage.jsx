import { Button, Form, Modal } from 'react-bootstrap';
import List from '../../components/card/List';
import SalesShopFilter from '../../components/filters/SalesShopFilter';
import PlusIcon from '../../components/ui/PlusIcon';
import { groups } from '../../data/groups';
import useShopCRUD from '../../hooks/useShopCRUD';

const defaultItems = {
   id: 0,
   productName: '',
   price: '',
   group: 'Non',
   quantity: '',
   description: '',
   date: '',
};

const SalesShopPage = () => {
   const {
      items: salesShops,
      item: salesShop,
      show,
      validated,
      group,
      selected,
      search,
      setSearch,
      currentPage,
      setCurrentPage,
      setGroup,
      openModal,
      handleShow,
      handleClose,
      handleChange,
      handleSubmit,
      handleSearch,
      deleteItem,
      editItem,
   } = useShopCRUD(defaultItems, 'salesShops');

   const salesFilter = {
      group,
      search,
      setGroup,
      handleSearch,
   };

   const studentTableProps = {
      group,
      search,
      salesShops,
      currentPage,
      setCurrentPage,
      editItem,
      deleteItem,
   };

   return (
      <div>
         <button
            onClick={openModal}
            className='btn btn-outline-warning ui-style mx-3 rounded-circle'
         >
            <PlusIcon></PlusIcon>
         </button>

         <SalesShopFilter {...salesFilter}></SalesShopFilter>

         <List {...studentTableProps}></List>

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
};

export default SalesShopPage;
