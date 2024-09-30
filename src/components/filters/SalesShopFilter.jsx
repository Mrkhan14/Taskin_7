import { memo } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { groups } from '../../data/groups';

import PropTypes from 'prop-types';

const SalesShopFilter = ({ handleSearch, search, group, setGroup }) => {
   console.log('SalesShopFilter');
   return (
      <InputGroup className='Search mb-3'>
         <Form.Control
            value={search}
            onChange={handleSearch}
            placeholder='Filter'
         />
         <InputGroup.Text>
            <Form.Select value={group} onChange={e => setGroup(e.target.value)}>
               <option value='all'>ALL GROUPS</option>
               {groups.map(group => (
                  <option key={group} value={group}>
                     {group}
                  </option>
               ))}
            </Form.Select>
         </InputGroup.Text>
      </InputGroup>
   );
};

SalesShopFilter.propTypes = {
   search: PropTypes.string,
   handleSearch: PropTypes.func,
   group: PropTypes.string,
   setGroup: PropTypes.func,
};

export default memo(SalesShopFilter);
