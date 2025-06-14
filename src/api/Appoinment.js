import axios from "axios";
import { Api_Paths, Base_Url, getHeaders } from "./Constant"

export const createAppointment = async (data) => {
    const url = Base_Url + Api_Paths.APPOINTMENTS;

    // const response = await axios(url, {
    //     data:data,
    //     method: 'POST',
    //     headers:getHeaders()
    // });
    // return response.data;

     console.log("Data ",data);
    return {
        ...data,
        id:new Date().getTime().toString(),
    }
}