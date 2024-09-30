import { createContext } from "react";
import { IAd } from "../pages/searchPage/SearchResult";

interface IAdsContext {
    ads: IAd[],
    setAds: (value: IAd[]) => void;
}

export const AdsContext = createContext<IAdsContext>({
    ads: [],
    setAds: () => {},
})
