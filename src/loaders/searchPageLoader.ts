import { getBase } from "../services/serviceBase";
import { IOccupations } from "../types/occupation-types";

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?offset=0&limit=10';


export const searchPageLoader = async ({request}: {request: Request}): Promise<IOccupations | null> => {
    const url = new URL(request.url);
    const freeSearch = url.searchParams.get("q");

    try {
        const occupationUrl = `${BASE_URL}&q=${freeSearch}`;
        const occupationsData = await getBase<IOccupations>(occupationUrl);

        return occupationsData;

    }

    catch (err) {
        console.log("Error fetching occupations:", err)
        return null;
    }

    
}