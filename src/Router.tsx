import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { jobPageLoader } from "./loaders/jobPageLoader";
import { searchPageLoader } from "./loaders/searchPageLoader";
import { DigiLoaderSpinner } from "@digi/arbetsformedlingen-react";
import { Suspense } from "react";
import { LoaderSpinnerSize } from "@digi/arbetsformedlingen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/search",
        element: (
          <Suspense
            fallback={
              <DigiLoaderSpinner
                afSize={LoaderSpinnerSize.LARGE}
                afText="Laddar"
              ></DigiLoaderSpinner>
            }
          >
            <Search></Search>
          </Suspense>
        ),
        loader: searchPageLoader,
      },
      {
        path: "/job/:id",
        element: <JobPage></JobPage>,
        loader: jobPageLoader,
      },
    ],
  },
]);
