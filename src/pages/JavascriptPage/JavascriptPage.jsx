import { useEffect, useState, useCallback  } from 'react';
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import PlusIcon from '../../components/UI/PlusIcon';
import LendingCard from '../../components/card/Card';
import { groups } from "../../data/groups";
const defaultBorrowing = {
   id: 0,
   productName: '',
   price: '',
   group: "REACT N1",
   quantity: '',
   description: '',
   date: '',
};
function BorrowingPage() {
   const [show, setShow] = useState(false);
   const [borrowings, setBorrowings] = useState([]);
   const [borrowing, setBorrowing] = useState(defaultBorrowing);
   const [validated, setValidated] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [search, setSearch] = useState('');
   const [selected, setSelected] = useState(null);
   const [ group, setGroup ] = useState( "all" );

   const handleSubmit = e => {
      e.preventDefault();
      if (e.currentTarget.checkValidity()) {
         if (selected === null) {
            const newUpdateBorrowings = [
               ...borrowings,
               { ...borrowing, id: v4() },
            ];
            setBorrowings(newUpdateBorrowings);
            localStorage.setItem(
               'borrowings',
               JSON.stringify(newUpdateBorrowings)
            );
            toast.success("Malumot qo'shildi");
         } else {
            const newAddBorrowings = borrowings.map(item =>
               item.id === selected ? borrowing : item
            );
            localStorage.setItem(
               'borrowings',
               JSON.stringify(newAddBorrowings)
            );
            setBorrowings(newAddBorrowings);
            toast.success("Malumot o'zgardi");
         }
         setBorrowing(defaultBorrowing);
         setValidated(false);
         handleClose();
      } else {
         setValidated(true);
         toast.error('Erverda xatolik bor');
      }
   };

   const handleChange = e => {
      setBorrowing({ ...borrowing, [e.target.id]: e.target.value });
   };

   const deleteData = id => {
      let newBorrowings = borrowings.filter(borrowing => borrowing.id !== id);
      if (newBorrowings) {
         setBorrowings(newBorrowings);
         localStorage.setItem('borrowings', JSON.stringify(newBorrowings));
         toast.success("Malumot o'chrildi");
      } else {
         toast.error('Erverda xatolik bor');
      }
   };

   const editData = id => {
      const moneyFound = borrowings.find(borrowing => borrowing.id === id);
      setSelected(id);
      setBorrowing(moneyFound);
      handleShow();
   };

   const openModal = () => {
      handleShow();
      setSelected(null);
      setBorrowing(defaultBorrowing);
   };

   const handleSearch = useCallback( ( e ) => {
      setSearch( e.target.value.trim().toLowerCase() )
   }, [] )

   useEffect(() => {
      const borrowings = JSON.parse(localStorage.getItem('borrowings'));
      const newData = Array.isArray(borrowings) ? borrowings : [];
      setBorrowings(newData);
   }, []);


   return (
      <div>
         <button
            onClick={openModal}
            className='btn btn-outline-warning ui-style mx-3 rounded-circle'
         >
            <PlusIcon></PlusIcon>
         </button>

         <InputGroup className="mb-3">
            <Form.Control
               value={search}
               onChange={handleSearch}
               placeholder="Searching student"
               />
               <InputGroup.Text>
               <Form.Select value={borrowings?.group} onChange={( e ) => setGroup( e.target.value )}>
                  <option value="all">ALL GROUPS</option>
                  {groups.map( ( group ) => (
                     <option key={group} value={group}>
                     {group}
                     </option>
                  ) )}
               </Form.Select>
               </InputGroup.Text>
               {/* <div className="alert alert-warning">{sum}</div> */}
            </InputGroup>

         {borrowings
            .filter(
               borrowing =>
                  borrowing.productName
                     .toLowerCase()
                     .includes(search.trim().toLowerCase()) 
            )
            .map((item, i) => (
               <LendingCard
                  key={i}
                  {...item}
                  path='borrowings'
                  data={item?.borrowing}
                  deleteData={deleteData}
                  editData={editData}
               />
            ))}

         <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>borrowing data</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group className='mb-3' controlId='productName'>
                     <Form.Label>First name</Form.Label>
                     <Form.Control
                        required
                        onChange={handleChange}
                        value={borrowing.productName}
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
                        value={borrowing.price}
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
                        value={borrowing.quantity}
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
                        value={borrowing.description}
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
                        value={borrowing.date}
                        type='date'
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     <Form.Control.Feedback type='invalid'>
                        Please fill!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="group">
                     <Form.Label>Groups</Form.Label>
                     <Form.Select onChange={handleChange} value={borrowings?.group}>
                        {groups.map( ( group ) => (
                           <option key={group} value={group}>
                           {group}
                           </option>
                        ) )}
                     </Form.Select>
                     <Form.Control.Feedback type="invalid">
                        Please fill !
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

export default BorrowingPage;
