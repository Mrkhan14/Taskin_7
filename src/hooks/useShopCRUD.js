import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

const useCRUD = (defaultItems, localStorageKey) => {
   const [show, setShow] = useState(false);
   const [items, setItems] = useState([]);
   const [item, setItem] = useState(defaultItems);
   const [validated, setValidated] = useState(false);
   const [search, setSearch] = useState('');
   const [selected, setSelected] = useState(null);
   const [group, setGroup] = useState('all');
   const [currentPage, setCurrentPage] = useState(1);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleSubmit = useCallback(
      e => {
         e.preventDefault();
         if (e.currentTarget.checkValidity()) {
            if (selected === null) {
               const newSetItems = [...items, { ...item, id: v4() }];
               setItems(newSetItems);
               localStorage.setItem(
                  localStorageKey,
                  JSON.stringify(newSetItems)
               );
               toast.success("Malumot qo'shildi");
            } else {
               const newSetItems = items.map(item =>
                  item.id === selected ? item : item
               );
               localStorage.setItem(
                  localStorageKey,
                  JSON.stringify(newSetItems)
               );
               setItems(newSetItems);
               toast.success("Malumot o'zgardi");
            }
            setItem(defaultItems);
            setValidated(false);
            handleClose();
         } else {
            setValidated(true);
            toast.error('Erverda xatolik bor');
         }
      },
      [item, items, selected]
   );

   const handleChange = useCallback(
      e => {
         setItem({ ...item, [e.target.id]: e.target.value });
      },
      [item]
   );

   const deleteItem = useCallback(
      id => {
         let newItems = items.filter(item => item.id !== id);
         if (newItems) {
            setItems(newItems);
            localStorage.setItem(localStorageKey, JSON.stringify(newItems));
            toast.success("Malumot o'chrildi");
         } else {
            toast.error('Erverda xatolik bor');
         }
      },
      [items]
   );

   
   const editItem = useCallback(
      id => {
         const moneyFound = items.find(item => item.id === id);
         setSelected(id);
         setItem(moneyFound);
         handleShow();
      },
      [items]
   );

   const openModal = () => {
      handleShow();
      setSelected(null);
      setItem(defaultItems);
   };

   const handleSearch = useCallback(e => {
      setSearch(e.target.value.trim().toLowerCase());
   }, []);

   useEffect(() => {
      const items = JSON.parse(localStorage.getItem(localStorageKey));
      const newData = Array.isArray(items) ? items : [];
      setItems(newData);
   }, []);

   return {
      items,
      item,
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
   };
};

export default useCRUD;
