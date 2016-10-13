import { INDEX_KEY_DEV, INDEX_KEY } from '../constants/Storage';

export const getIndexKey = () => {
  if (process.env.NODE_ENV === 'production') {
    return INDEX_KEY;
  }

  return INDEX_KEY_DEV;
};
