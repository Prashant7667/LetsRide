import httpClient from "../services/httpClient";

export const submitRating = (rideId, ratingData) => {
  return httpClient.post(`/ratings/driver/${rideId}`, ratingData);
};