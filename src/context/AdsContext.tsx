import { createContext } from "react";
import { IAd } from "../pages/searchPage/SearchResult";

interface IAdsContext {
    ads: IAd[],
    setAds: (value: IAd[]) => void;
    createFilterParams: () => void;
    getData: () => void;
    totalAds: number;
    totalPositions: number;
    fetched: boolean;
}

export const AdsContext = createContext<IAdsContext>({
    ads: [],
    setAds: () => {},
    createFilterParams: () => {},
    getData: () => {},
    totalAds: 0,
    totalPositions: 0,
    fetched: false
})
