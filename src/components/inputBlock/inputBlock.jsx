import { useState } from 'react';

import './inputBlock.scss';

const InputBlock = ({title, value, name, handleFunction}) => {
     const [stateValue, setStateValue] = useState(value);
     const handleChange = (ev) => {
          handleFunction(ev);
          setStateValue(ev.target.value);
     }
     return (
          <div className="field__block">
               <h6 className="field__title">{title}</h6>
               <input 
                    type="text" 
                    className="field__input" 
                    name={name}
                    value={stateValue} 
                    onChange={handleChange}/>
          </div>
     )
}

export default InputBlock;