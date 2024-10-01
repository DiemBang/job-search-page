import { useContext } from 'react';
import AdsContext from '../context/AdsContext';

const useAdsContext = () => {
  const context = useContext(AdsContext);

  if (!context) {
    throw new Error('the context need to be inside the AdsContextProvider');
  }

  return context;
};

export default useAdsContext;
