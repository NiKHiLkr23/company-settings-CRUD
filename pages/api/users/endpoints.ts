import { ICollectionResponse, IUser } from "@/types/Types";
import axios from "axios";
const api = axios.create({
  baseURL: "https://uers-api.p.rapidapi.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-RapidAPI-Key": "e25ee1c540msh4fd6d1683dd2b3fp187fcajsn6bfe8565f40b",
    "X-RapidAPI-Host": "uers-api.p.rapidapi.com",
  },
});

// Get all users Data
const GetUsers = async () => {
  const response = await api.get<ICollectionResponse<IUser[]>>("/api/users");
  return response.data.data;
};

// Get Single User data
const GetSingleUser = async (id: string) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data.data;
};

// Post/Create user data
const CreateUser = async (data: IUser) => {
  const { data: response } = await api.post("/api/users", data);
  return response.data;
};

// Put/Update user data
const UpdateUser = async (id: string, data: IUser) => {
  const response = await api.put<any>(`/api/users/${id}`, data);
  return response.data;
};

// Delete user data
const DeleteUser = async (id: string) => {
  const response = await api.delete<any>(`/api/users/${id}`);
  return response.data;
};

const Endpoints = {
  GetUsers,
  GetSingleUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};

export default Endpoints;
