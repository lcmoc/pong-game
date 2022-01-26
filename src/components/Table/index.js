import './styles.css'

import Ball from '../Ball';
import Pad from '../Pad';

const Table = ({playingIsActive}) => {
  return (
    <div className="OuterWrapper">
      <div className='InnerWrapper'>
          <Pad />
          <Pad />
          <Ball playingIsActive={playingIsActive}/>
      </div>
    </div>
  );
};

export default Table;