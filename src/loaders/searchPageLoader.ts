import { getBase } from "../services/serviceBase";
import { IOccupations } from "../types/occupation-types";

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?limit=10';


export const searchPageLoader = async ({request}: {request: Request}): Promise<IOccupations | null> => {
    const url = new URL(request.url);
    const freeSearch = url.searchParams.get("q");
    const pageValue = url.searchParams.get("page");

    const page: number = pageValue ? parseInt(pageValue) : 1;    
    const offsetValue = (page - 1) * 10;

    try {
        const occupationUrl = `${BASE_URL}&offset=${offsetValue}&q=${freeSearch}`;
        const occupationsData = await getBase<IOccupations>(occupationUrl);

        return occupationsData;

    }

    catch (err) {
        console.log("Error fetching occupations:", err)
        return null;
    }

    
}