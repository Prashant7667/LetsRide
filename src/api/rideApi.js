import httpClient from "../services/httpClient";

export const RequstRide = (rideData) => {
  return httpClient.post('/rides/request', rideData);
};

export const AcceptRide = (rideId) => {
  return httpClient.post(`/rides/${rideId}/accept`);
};

export const RejectRide = (rideId) => {
  return httpClient.post(`/rides/${rideId}/reject`);
};

export const StartRide = (rideId) => {
  return httpClient.post(`/rides/${rideId}/start`);
};

export const CompleteRide = (rideId) => {
  return httpClient.post(`/rides/${rideId}/complete`);
};
export const PassengerCancelRide = (rideId) => {
  return httpClient.post(`/rides/me/${rideId}/cancel`);
};

export const CancelRide = (rideId) => {
  return httpClient.post(`/rides/${rideId}/cancel`);
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

export const getDriverRideHistory = () => {
  return httpClient.get('/rides/me/driver/rideHistory');
};
export const getPassengerRideHistory = () => {
  return httpClient.get('/rides/me/passenger/rideHistory');
};
export const getAvailableRides = () => {
  return httpClient.get('/rides/available');
};
