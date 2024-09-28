import { IJobPageLoader } from '../models/IJobPageLoader';
import { IOccupation } from '../types/occupation-types';
import { getBase } from '../services/serviceBase';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/ad/';

export const jobPageLoader = async ({
  params,
}: IJobPageLoader): Promise<IOccupation | null> => {
  try {
    const occupationUrl = `${BASE_URL}${params.id}`;
    const occupationData = await getBase<IOccupation>(occupationUrl);
    console.log('this is the response with occupation: ', occupationData);
    return occupationData;
  } catch (err) {
    console.log('error fetching occupation data: ', err);
    return null;
  }
};
