import api from '../api';

const complaintService = {
  getComplaintsByResident: async (residentId: string) => {
    const res = await api.get(`/complaints/resident/${residentId}`);
    return res.data;
  },
};

export default complaintService;
