import api from "./api";

export const fetchPins = () => api.get("/pins");
export const fetchPinBySlug = (slug) => api.get(`/pins/${slug}`);
export const uploadPin = (formData) =>
  api.post("/pins", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const toggleLike = (id) => api.post(`/pins/${id}/like`);
