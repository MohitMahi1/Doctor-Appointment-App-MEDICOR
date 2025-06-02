import { specialitiesData } from "../data/AppContentData";
import { Api_Paths, Base_Url } from "./Constant";

export const fetchSpecialities = async () => {
    const url = Base_Url + Api_Paths.SPECIALITY;
    
        // const {data} = await axios.get(url);
        // return data;

        return specialitiesData
}