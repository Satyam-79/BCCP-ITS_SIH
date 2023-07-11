import axios from "../axios-client";
export const BaseURL = "https://jofi.up.railway.app";

export async function AdminServices(
    method: string,
    url: string,
    data?: any,
    headers?: any
  ) {
    try {
      const response = await axios({
        method,
        url:`${BaseURL}/${url}`,
        data,
      });
   
      return response.data;
    } catch (error) {
      throw error;
    }

  
  }
