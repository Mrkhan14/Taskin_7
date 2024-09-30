import PropTypes from 'prop-types';
import { memo } from 'react';
import LendingCard from '../../components/card/Card';
import { LIMIT } from '../../constants/index';
const List = props => {
   const {
      group,
      search,
      salesShops,
      currentPage,
      editData,
      deleteData,
      setCurrentPage,
   } = props;
   console.log('List');
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
      </div>
   );
};

List.prototype = {
   salesShops: PropTypes.array,
   editData: PropTypes.func,
   deleteData: PropTypes.func,
   search: PropTypes.string,
   group: PropTypes.string,
};
export default memo(List);
