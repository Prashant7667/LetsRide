import httpClient from "../services/httpClient";
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
export const deleteDriver=()=>{
    return httpClient.delete(`/drivers/me`);
}
export const updateDriverAvailability=(availabilityData)=>{
    return httpClient.patch(`/drivers/me/availability`,availabilityData);
}