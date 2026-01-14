import httpClient from "../services/httpClient";
export const getAllPassengers=()=>{
    return httpClient.get('/passengers');
}
export const getPassengerById=(passengerId)=>{
    return httpClient.get(`/passengers/${passengerId}`);
}
export const updatePassenger=(passengerData)=>{
    return httpClient.put(`/passengers/me/update`,passengerData);
}
export const deletePassenger=()=>{
    return httpClient.delete(`/passengers/delete`);
}
export const getPassengerProfile=()=>{
    return httpClient.get('/passengers/me/details');
}
