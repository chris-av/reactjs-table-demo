import axios from 'axios';

export const queryData = async () => {
  try {
    const endpoint = 'https://randomuser.me/api?results=20';
    const { data } = await axios.get(endpoint);
    return data;
  } catch (err) {
    return err;
  }
}
