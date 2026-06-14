import api from "./api";

export const getMyOrders = () => api.get("/orders/my");
export const getAllOrders = () => api.get("/orders/all");
export const createOrder = (data) => api.post("/orders", data);
export const updateOrderStatus = (id, status_id) =>
  api.put(`/orders/${id}/status`, { status_id });
export const extendOrderDate = (id, new_delivery_date) =>
  api.put(`/orders/${id}/extend`, { new_delivery_date });
