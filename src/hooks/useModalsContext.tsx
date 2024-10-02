import { useContext } from 'react';
import ModalsContext from '../context/ModalsContext';

const useModalsContext = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error('the context need to be inside the ModalsContextProvider');
  }

  return context;
};

export default useModalsContext;
