import { createContext, ReactNode } from 'react';
import { IOccupations } from '../types/occupation-types';

const JobsContext = createContext<IJobsContextValues | null>(null);

interface IJobsContextProviderProps {
  children: ReactNode;
  occupations: IOccupations;
}

interface IJobsContextValues {
  occupations: IOccupations;
}

export const JobsContextProvider = ({
  children,
  occupations,
}: IJobsContextProviderProps) => {
  const jobInfoValues: IJobsContextValues = {
    occupations,
  };

  return (
    <JobsContext.Provider value={jobInfoValues}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsContext;
