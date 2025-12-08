import httpClient from "../services/httpClient";
export const submitRating=(rideId,driverId,star, comment)=>{
    return httpClient.post(`/ratings/submit/${rideId}`,driverId,star, comment)
}