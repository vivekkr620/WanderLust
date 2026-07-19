import api from "./api";

export const getAllListings = async () => {
  const res = await api.get("/listings");
  return res.data.listings;
};

export const getListingById = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data.listing;
};