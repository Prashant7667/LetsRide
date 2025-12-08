import httpClient from '../utils/httpClient';
export const createDriver=(driverData)=>{
    return httpClient.post('/drivers',driverData);
}
export const getAllDrivers=()=>{
    return httpClient.get('/drivers');
}
export const getDriverById=(driverId)=>{
    return httpClient.get(`/drivers/${driverId}`);
}
export const updateDriver=(driverId,driverData)=>{
    return httpClient.put(`/drivers/${driverId}`,driverData);
}
export const deleteDriver=(driverId)=>{
    return httpClient.delete(`/drivers/${driverId}`);
}
export const updateDriverAvailability=(driverId,availabilityData)=>{
    return httpClient.patch(`/drivers/${driverId}/availability`,availabilityData);
}