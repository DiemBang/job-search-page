import { useContext } from 'react';
import AdvertsContext from '../context/AdvertsContext';

const useAdvertsContext = () => {
  const context = useContext(AdvertsContext);

  if (!context) {
    throw new Error('the context need to be inside the AdvertsContextProvider');
  }

  return context;
};

export default useAdvertsContext;
