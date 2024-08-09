import api from "./api";

export const fetchAllTargets = () => api.get("/targets");
export const createTarget = (targetData) => api.post("/targets", targetData);