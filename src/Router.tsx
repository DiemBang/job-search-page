import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { jobPageLoader } from "./loaders/jobPageLoader";
import { searchPageLoader } from "./loaders/searchPageLoader";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                index: true
            },
            {
                path: "/search",
                element: <Search></Search>,
                loader: searchPageLoader
            },
            {
                path: "/job/:id",
                element: <JobPage></JobPage>,
                loader: jobPageLoader
            }
        ]
    }
])