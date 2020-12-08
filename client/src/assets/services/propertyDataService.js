import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/property-data`);
    return res.data || [];
  }
}