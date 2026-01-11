import httpClient from "../services/httpClient";

export const RequstRide = (rideData) => {
  return httpClient.post('/rides/request', rideData);
};

export const AcceptRide = (rideId, driverId) => {
  return httpClient.post(`/rides/${rideId}/accept`, { driverId });
};

export const RejectRide = (rideId, driverId) => {
  return httpClient.post(`/rides/${rideId}/reject`, { driverId });
};

export const StartRide = (rideId, driverId) => {
  return httpClient.post(`/rides/${rideId}/start`, { driverId });
};

export const CompleteRide = (rideId, driverId) => {
  return httpClient.post(`/rides/${rideId}/complete`, { driverId });
};

export const CancelRide = (rideId, driverId) => {
  return httpClient.post(`/rides/${rideId}/cancel`, { driverId });
};

export const getRideById = (rideId) => {
  return httpClient.get(`/rides/${rideId}`);
};

export const updateRide = (rideId, rideData) => {
  return httpClient.put(`/rides/${rideId}`, rideData);
};

export const deleteRide = (rideId) => {
  return httpClient.delete(`/rides/${rideId}`);
};

export const getRideHistory = () => {
  return httpClient.get('/rides/rideHistory');
};

export const getAvailableRides = () => {
  return httpClient.get('/rides/available');
};
