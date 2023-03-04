import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '~/components/NavBar';
import LoaderSuspense from '~/components/LoaderSuspense';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<LoaderSuspense />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
