import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const feedBackService = async (params: any) => {
  const response = await axios.post(ApiConfig.feedBack, params);
  return response.data;
};
