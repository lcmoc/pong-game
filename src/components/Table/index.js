import './styles.css'

import Ball from '../Ball';
import Pad from '../Pad';

const Table = () => {
  return (
    <div className="OuterWrapper">
      <div className='InnerWrapper'>
          <Pad />
          <Pad />
          <Ball />
      </div>
    </div>
  );
};

export default Table;