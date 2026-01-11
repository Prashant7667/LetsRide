import httpClient from "../services/httpClient";

export const login = (credentials) => {
  return httpClient.post('/auth/login', credentials);
};

export const registerPassenger = (passengerData) => {
  return httpClient.post('/auth/passenger/register', passengerData);
};

export const registerDriver = (driverData) => {
  return httpClient.post('/auth/driver/register', driverData);
};