import axios from "axios";
import { Api_Paths, Base_Url } from "./Constant"
import { doctorsData } from "../data/AppContentData";

export const fetchDoctors = async () => {
    const url = Base_Url + Api_Paths.DOCTORS;

    // const {data} = await axios.get(url);
    // return data;
    return doctorsData
}

export const fetchDoctorsById = async (id) => {
    const url = Base_Url + Api_Paths.DOCTORS;

    // const {data} = await axios.get(url);
    // return data;
    return doctorsData?.find((item) => item.id === id);
}