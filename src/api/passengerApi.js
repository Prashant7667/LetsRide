import httpClient from "../services/httpClient";
export const getAllPassengers=()=>{
    return httpClient.get('/passengers');
}
export const getPassengerById=(passengerId)=>{
    return httpClient.get(`/passengers/${passengerId}`);
}
export const updatePassenger=(passengerId,passengerData)=>{
    return httpClient.put(`/passengers/${passengerId}`,passengerData);
}
export const deletePassenger=(passengerId)=>{
    return httpClient.delete(`/passengers/${passengerId}`);
}
