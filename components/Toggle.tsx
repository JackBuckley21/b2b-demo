import React, { useState } from 'react';
import {Switch} from "@nextui-org/react";


interface ToggleProps {

  initialState?: boolean;  // Optional initial state 
  onChange?: (newState: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialState = true, onChange }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <div className='pl-5 pt-5 pb-2'>
      <Switch size="lg" color='secondary'checked={isOn} onChange={handleToggle}>
    <span className='text-white'> Add Trade-Ins </span>
     </Switch>
    </div>
  );
};

export default Toggle;
