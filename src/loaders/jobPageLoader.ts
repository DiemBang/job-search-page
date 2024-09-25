import axios from "axios";
import { IJobPageLoader } from "../models/IJobPageLoader";

const BASE_URL = "https://jobsearch.api.jobtechdev.se/ad/";

export const jobPageLoader = async ({params}: IJobPageLoader) => {
    let response = await axios.get(`${BASE_URL}${params.id}`);
    console.log(response.data);

    return response;
}