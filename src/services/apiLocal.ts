import axios from "axios";
export const apiLocal = axios.create({
    baseURL: `${process.env.NEXTAUTH_URL}/api`
  });