import { createContext } from "react";
import { IAd } from "../pages/searchPage/SearchResult";

interface IAdsContext {
    ads: IAd[],
    setAds: (value: IAd[]) => void;
    createFilterParams: () => URLSearchParams;
    getData: (params:URLSearchParams | null) => void;
    totalAds: number;
    totalPositions: number;
    fetched: boolean;
}

export const AdsContext = createContext<IAdsContext>({
    ads: [],
    setAds: () => {},
    createFilterParams: () => new URLSearchParams(),
    getData: () => {},
    totalAds: 0,
    totalPositions: 0,
    fetched: false
})
