import { createContext, ReactNode } from 'react';
import { IOccupation } from '../types/occupation-types';

const JobContext = createContext<IJobContextValues | null>(null);

interface IJobContextProviderProps {
  children: ReactNode;
  occupation: IOccupation;
}

interface IJobContextValues {
  occupation: IOccupation;
}

export const JobContextProvider = ({
  children,
  occupation,
}: IJobContextProviderProps) => {
  const jobInfoValues: IJobContextValues = {
    occupation,
  };

  return (
    <JobContext.Provider value={jobInfoValues}>{children}</JobContext.Provider>
  );
};

export default JobContext;
