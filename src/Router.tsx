import { createHashRouter } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { SearchPage } from './pages/searchPage/SearchPage';
import { jobPageLoader } from './loaders/jobPageLoader';
import { searchPageLoader } from './loaders/searchPageLoader';
import { DigiLoaderSpinner } from '@digi/arbetsformedlingen-react';
import { Suspense } from 'react';
import { LoaderSpinnerSize } from '@digi/arbetsformedlingen';
import { Layout } from './pages/Layout';
import { Home } from './pages/home/Home';
import Job from './pages/job/Job';
import { MyFavourites } from './pages/MyFavourites';

export const router = createHashRouter(
  [
    {
      path: '/',
      element: <Layout></Layout>,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
          index: true,
        },
        {
          path: '/search',
          element: (
            <Suspense
              fallback={
                <DigiLoaderSpinner
                  afSize={LoaderSpinnerSize.LARGE}
                  afText="Laddar"
                ></DigiLoaderSpinner>
              }
            >
              <SearchPage></SearchPage>
            </Suspense>
          ),
          loader: searchPageLoader,
        },
        {
          path: '/search/job/:id',
          element: <Job></Job>,
          loader: jobPageLoader,
        },
        {
          path: '/savedAds',
          element: <MyFavourites></MyFavourites>,
        },
      ],
    },
  ],
  {
    basename: '/case-af-diggi-loo-diggi-ley',
  }
);
