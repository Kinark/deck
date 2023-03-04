import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '~/components/Layout';
import Details from '~/pages/Details';
import Home from '~/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'details/:driverId',
        element: <Details />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
