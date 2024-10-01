import { createContext } from "react";

// interface ILanguages {
//     languages: string | [];
//     education: string | [];
// }

interface IFilterContext {
    // employment_type: string;
    // working_hours_type: string;
    // publication_date: string;
    drivingLicense: boolean;
    setDrivingLicense: (value:boolean) => void;
    // must_have: ILanguages;
    // remote: boolean;
}

export const FilterContext = createContext<IFilterContext>({
    // employment_type: "",
    // working_hours_type: "",
    // publication_date: "",
    drivingLicense: false,
    setDrivingLicense: () => {},
    // must_have: {
    //     languages: "",
    //     education: "",
    // },
    // remote: false,
});