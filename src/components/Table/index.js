import './styles.css'

import Ball from '../Ball';
import Pad from '../Pad';

const Table = ({playingIsActive, increaseCounter}) => {
  return (
    <div className="OuterWrapper">
      <div className='InnerWrapper'>
          <Pad />

          <Ball playingIsActive={playingIsActive} increaseCounter={increaseCounter}/>
          <Pad />
      </div>
    </div>
  );
};

export default Table;